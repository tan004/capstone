from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class CuisineForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()])
