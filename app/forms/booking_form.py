from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError


# class wtforms.fields.html5.DateField(default field arguments, format='%Y-%m-%d')
# Represents an <input type="date">

# class wtforms.fields.html5.TimeField(default field arguments, format='%H:%M')
# Represents an <input type="time">.

class BookingForm(FlaskForm):
    size = StringField('size', validators=[DataRequired()])
    startDate = DateField('startDate', validators=[DataRequired()])
    startTime = TimeField('startTime', validators=[DataRequired()])
