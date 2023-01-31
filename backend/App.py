import os
from dotenv import load_dotenv

from flask import (
    Flask, request
)
# from sqlalchemy.exc import IntegrityError

from forms import (
    UserAddForm, LoginForm
)
from models import (
    db, connect_db, User, Likes)

load_dotenv()


app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ['DATABASE_URL'].replace("postgres://", "postgresql://"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

connect_db(app)
