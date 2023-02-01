from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, IntegerField, FileField
from wtforms.validators import DataRequired, Email, Length
from wtforms import validators

class UserAddForm(FlaskForm):
    """Form for adding users."""

    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[Length(min=6)])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    location = IntegerField('Location',validators=[DataRequired()])

class UserUpdateForm(FlaskForm):
    """Form for updating a user."""

    password = PasswordField('Password', validators=[Length(min=6)])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    location = IntegerField('Location',validators=[DataRequired()])
    radius = IntegerField('radius',validators=[DataRequired()])
    bio = TextAreaField('bio',validators=[DataRequired()])

class LoginForm(FlaskForm):
    """Login form."""

    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[Length(min=6)])

class UploadImageForm(FlaskForm):
    '''Image upload form'''
    file = FileField('Image', [DataRequired()])