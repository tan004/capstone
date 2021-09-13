from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class ImageForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
