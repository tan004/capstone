from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError


class RestaurantForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('Zip Code', validators=[DataRequired()])
    profile_pic = StringField('Profile Picture', validators=[DataRequired()])
    lat = StringField('latitude')
    lng = StringField('longitude')
