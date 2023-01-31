"""SQLAlchemy models for Friender."""

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

DEFAULT_IMAGE_URL = "/static/images/default-pic.png"

class Likes(db.Model):
    """Connection of a liker and a liked_user"""

    __tablename__ = "likes"

    user_being_liked_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )

    user_liking_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )

class Dislikes(db.Model):
    """Connection of a disliker and a disliked_user"""

    __tablename__ = "dislikes"

    user_being_disliked_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )

    user_disliking_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )

class User(db.Model):
    """User in the system"""

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    first_name = db.Column(
        db.Text,
        nullable=False,
    )

    last_name = db.Column(
        db.Text,
        nullable=False,
    )

    email = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    image_url = db.Column(
        db.Text,
        default=DEFAULT_IMAGE_URL,
    )

    bio = db.Column(
        db.Text,
    )

    location = db.Column(
        db.Integer,
        nullable=False,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    likers = db.relationship(
        "User",
        secondary="likes",
        primaryjoin=(Likes.user_being_liked_id == id),
        secondaryjoin=(Likes.user_liking_id == id),
        backref="liking",
    )
    dislikers = db.relationship(
        "User",
        secondary="dislikes",
        primaryjoin=(Dislikes.user_being_disliked_id == id),
        secondaryjoin=(Dislikes.user_disliking_id == id),
        backref="disliking",
    )

    def __repr__(self):
        return f"<User #{self.id}: {self.first_name} {self.last_name} {self.email}>"

    @classmethod
    def signup(cls, email, first_name, last_name, location, password, bio=None, image_url=DEFAULT_IMAGE_URL):
        """Sign up user.

        Hashes password and adds user to system.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            location=location,
            bio=bio,
            password=hashed_pwd,
            image_url=image_url,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, email, password):
        """Find user with `email` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If this can't find matching user (or if password is wrong), returns
        False.
        """

        user = cls.query.filter_by(email=email).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False



    ## method that shows available users based on location
    def available_users(self):
        # people who we don't dislike
        # people who

    ## method that shows matches
    def matches(self):
        """"""
