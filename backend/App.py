import os
from dotenv import load_dotenv

from flask import (
    Flask, request, jsonify
)
from sqlalchemy.exc import IntegrityError

from forms import (
    UserAddForm, LoginForm
)
from models import (
    db, connect_db, User, Likes)
from functools import wraps
import jwt

load_dotenv()


app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ['DATABASE_URL'].replace("postgres://", "postgresql://"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['WTF_CSRF_ENABLED'] = False

connect_db(app)

db.create_all()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'authorization' in request.headers:
            token = request.headers['authorization']
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            curr_user = User.query.filter_by(id = data['id']).first()
        except:
            return jsonify({'message': 'Invalid token'}), 401

        return f(curr_user, *args, **kwargs)
    return decorated

@app.post('/login')
def login():
    '''Handle user login and return token on success'''

    data = request.get_json()
    form = LoginForm(data=data)

    if form.validate_on_submit():
        email = form.data["email"]
        password = form.data["password"]
        curr_user = User.authenticate(email, password)
        if curr_user:
            token = jwt.encode({
                'id': curr_user.id,
                'name': curr_user.first_name
            }, app.config['SECRET_KEY'])
            return jsonify({'token': token}), 201
        else:
            return jsonify({'message': 'Invalid Credentials'})
    else:
        return jsonify({'errors': form.errors})

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
            token = jwt.encode({
                'id': user.id,
                'name': user.first_name
            }, app.config['SECRET_KEY'])
            return jsonify({'token': token}), 201

        except IntegrityError:
            return jsonify({'message': 'Email already taken'})

    else:
        return jsonify({'errors': form.errors})



# Get next available user
# Get curr_user profile
# login
# signup
# update user
# get all matches
