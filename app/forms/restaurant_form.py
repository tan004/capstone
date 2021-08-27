from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError


def check_phone(form, field):
    phone = field.data
    if len(phone) > 10:
        raise ValidationError('Phone number should be 10 digits long.')


def check_zip_code(form, field):
    zip_code = field.data
    if len(zip_code) > 10:
        raise ValidationError('US postal code should be under 7 digits.')


class RestaurantForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired(), check_phone])
    description = TextAreaField('description', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('Zip Code', validators=[DataRequired(), check_zip_code])
    profile_pic = StringField('Profile Picture', validators=[DataRequired()])
    lat = StringField('latitude')
    lng = StringField('longitude')
