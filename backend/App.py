import os
from dotenv import load_dotenv

from flask import (
    Flask, request, jsonify, g
)
from sqlalchemy.exc import IntegrityError

from forms import (
    UserAddForm, LoginForm
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
load_dotenv()


app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ['DATABASE_URL'].replace("postgres://", "postgresql://"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config["JWT_SECRET_KEY"] = os.environ['SECRET_KEY']
app.config['WTF_CSRF_ENABLED'] = False
jwt = JWTManager(app)

connect_db(app)

db.create_all()

@app.before_request
@jwt_required(optional=True)
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""
    g.user = User.query.filter_by(id=get_jwt_identity()).one_or_none()

# @jwt.user_identity_loader
# def user_identity_lookup(user):
#     '''TODO:'''
#     return user.id


# @jwt.user_lookup_loader
# def user_lookup_callback(_jwt_header, jwt_data):
#     '''TODO:'''
#     identity = jwt_data["sub"]
#     return User.query.filter_by(id=identity).one_or_none()


@app.post('/login')
def login():
    '''Handle user login and return token on success'''

    data = request.get_json()
    form = LoginForm(data=data)

    if form.validate_on_submit():
        email = form.data["email"]
        password = form.data["password"]
        user = User.authenticate(email, password)
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 201
        else:
            return jsonify(message='Invalid Credentials')
    else:
        return jsonify(errors=form.errors)

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
                first_name=form.data["first_name"],
                last_name=form.data["last_name"],
                bio=form.data["bio"],
                location=form.data["location"],
                image_url=form.data["image_url"]
            )
            db.session.commit()
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 201

        except IntegrityError:
            return jsonify({'message': 'Email already taken'})

    else:
        return jsonify({'errors': form.errors})

@app.get('/users/<int:id>/matches')
@jwt_required()
def get_all_matches():
    """Gets all matches associated with user id"""
    current_user = get_current_user()
    print(current_user)
    user = User.query.get_or_404(id)
    matches = user.get_matches()

    return jsonify(matches=matches)


@app.get('/users/profile')
@jwt_required()
def curr_user_profile():
    """Gets current logged in user profile"""
    return jsonify(user=g.user.serialize())


@app.get('/users/<int:id>')
@jwt_required()
def user_profile(id):
    """Gets all user information associated with user id"""
    user = User.query.get_or_404(id)

    return jsonify(user=user.get_display_info())

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
