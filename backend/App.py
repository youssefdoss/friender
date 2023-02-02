import os
from dotenv import load_dotenv
from datetime import timedelta

from flask import (
    Flask, request, jsonify, g
)
from sqlalchemy import column
from sqlalchemy.exc import IntegrityError

from forms import (
    UserAddForm, LoginForm, UploadImageForm, UserUpdateForm
)
from models import (
    db, connect_db, User, Likes)
from functools import wraps

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
    get_current_user
)

from flask_cors import CORS

import boto3
from werkzeug.utils import secure_filename
load_dotenv()

s3 = boto3.client('s3',
    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
)
BUCKET_NAME = os.environ['BUCKET_NAME']
BASE_AWS_URL = os.environ['BASE_AWS_URL']

app = Flask(__name__)

CORS(app)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ['DATABASE_URL'].replace("postgres://", "postgresql://"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config["JWT_SECRET_KEY"] = os.environ['SECRET_KEY']
app.config['WTF_CSRF_ENABLED'] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = False
jwt = JWTManager(app)

connect_db(app)

db.create_all()

@app.before_request
@jwt_required(optional=True)
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""
    try:
        g.user = User.query.filter_by(id=get_jwt_identity()).one_or_none()
    except:
        g.user = None


# TODO: Get location
@app.post('/login')
def login():
    '''Handle user login and return token on success'''
    data = request.get_json()
    form = LoginForm(data=data)
    print(data)
    if form.validate_on_submit():
        email = form.data["email"]
        password = form.data["password"]
        user = User.authenticate(email, password)
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify(token=access_token), 201
        else:
            return jsonify(errors='Invalid Credentials'), 401
    else:
        return jsonify(errors=form.errors), 400

@app.post('/signup')
def signup():
    '''Handle user signup and return token on success'''

    data = request.get_json()
    form = UserAddForm(data=data)

    if form.validate_on_submit():
        try:
            user = User.signup(
                password=form.data["password"],
                email=form.data["email"],
                first_name=form.data["firstName"],
                last_name=form.data["lastName"],
                location=form.data["location"],
            )
            db.session.commit()
            access_token = create_access_token(identity=user.id)
            return jsonify(token=access_token), 201

        except IntegrityError:
            return jsonify(errors='Email already taken'), 400

    else:
        return jsonify(errors=form.errors), 400

@app.get('/users/<int:id>/available-user')
@jwt_required()
def available_user(id):
    """Gets all user information associated with user id
    TODO: move logic into method"""
    if id == g.user.id:
        try:
            user = User.query.get_or_404(g.user.id)
            disliked_users_ids = [u.id for u in user.disliking]
            liked_users_ids = [u.id for u in user.liking]

            available_user = User.query.filter(
                ~User.id.in_(liked_users_ids + disliked_users_ids)
            ).first()

            return jsonify(available_user)
        except Exception as e:
            return jsonify(errors=e), 404


@app.get('/users/<int:id>/matches')
@jwt_required()
def get_all_matches():
    """Gets all matches associated with user id"""
    current_user = get_current_user()
    user = User.query.get_or_404(id)
    matches = user.get_matches()

    return jsonify(matches=matches)


@app.patch('/users/<int:id>')
@jwt_required()
def edit_profile(id):
    '''Edit your own profile'''
    if id == g.user.id:
        data = request.get_json()
        form = UserUpdateForm(data=data)

        user = g.user

        if form.validate_on_submit():
            user.first_name = form.data.get('firstName')
            user.last_name = form.data.get('lastName')
            user.location = form.data.get('location')
            user.radius = form.data.get('radius')
            user.bio = form.data.get('bio')

            db.session.add(user)
            db.session.commit()

            return jsonify(user=user.serialize())
        else:
            return jsonify(errors=form.errors)
    else:
        return jsonify(errors='You cannot edit other profiles'), 401

@app.get('/users/<int:id>')
@jwt_required()
def user_profile(id):
    """Gets all user information associated with user id"""
    if id == g.user.id:
        return jsonify(user=g.user.serialize())
    else:
        try:
            user = User.query.get_or_404(id)
            return jsonify(user=user.get_display_info())
        except Exception as e:
            return jsonify(errors=e), 404

@app.post('/users/like/<int:like_id>')
@jwt_required()
def like(like_id):
    '''Likes a user'''
    liked_user = User.query.get_or_404(like_id)
    g.user.liking.append(liked_user)
    db.session.commit()

    if g.user in liked_user.liking:
        return jsonify(message="match")

    return jsonify(message="liked")

#users/id/like
#users/id/like/like_id
@app.post('/users/dislike/<int:dislike_id>')
@jwt_required()
def dislike(dislike_id):
    '''Dislikes a user'''
    disliked_user = User.query.get_or_404(dislike_id)
    g.user.disliking.append(disliked_user)
    db.session.commit()

    return jsonify(message="disliked")


@app.post('/upload')
@jwt_required()
def upload():
    '''Upload image to s3'''
    form = UploadImageForm()

    if form.validate_on_submit():
        img = request.files['file']
        if img:
            filename_raw = secure_filename(img.filename)
            _, file_extension = os.path.splitext(filename_raw)
            filename = f'user{g.user.id}_image{file_extension}'

            s3.upload_fileobj(
                img,
                BUCKET_NAME,
                filename
            )

            image_url = f'{BASE_AWS_URL}/{filename}'
            g.user.image_url = image_url

            db.session.commit()
            return jsonify(message='Upload Done!')
    else:
        return jsonify(errors=form.errors), 400


# @app.post('/users/')
# @jwt_required()
# def user_profile():
#     """Gets all user information associated with user id"""





# Get next available user
# Get curr_user profile
# login
# signup
# update user
# get all matches
