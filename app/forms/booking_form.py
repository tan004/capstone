import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError
from ..models.booking import Booking
from datetime import time, date, datetime

from app.models import booking

# class wtforms.fields.html5.DateField(default field arguments, format='%Y-%m-%d')
# Represents an <input type="date">

# class wtforms.fields.html5.TimeField(default field arguments, format='%H:%M')
# Represents an <input type="time">.


# def check_spot(form, field):
#     booking_time = field.data
#     print('xxxxxxx', time(booking_time.hour))
#     allbookings = Booking.query.filter(Booking.).all()

# print('ssssssss', allbookings)
# raise ValidationError('no more spots in this hour')

# def check_date(form, field):
#     booking_date = field.data

#     if booking_date < date.today():
#         raise ValidationError('Please select the valid date!')


def check_date_max(form, field):
    booking_date = field.data
    booking_max = Booking.query.filter(
        Booking.startDate == booking_date).count()

    if booking_max >= 10:
        raise ValidationError('sorry, no more spot for the selected date!')


def check_time(form, field):
    booking_time = field.data
    # print('ssssssss', datetime.now().month)
    # TODO bug in heroku when the date is same.
    if(form.data['startDate'] < date.today()):
        raise ValidationError('Please select the valid date!')
    elif form.data['startDate'] == date.today():
        if booking_time.hour < datetime.now().hour:
            raise ValidationError('Please select the valid hour!')
        elif booking_time.hour == datetime.now().hour:
            if booking_time.minute < datetime.now().minute:
                raise ValidationError('Please select the valid minute!')


class BookingForm(FlaskForm):
    size = StringField('size', validators=[DataRequired()])
    startDate = DateField('startDate', validators=[
                          DataRequired(), check_date_max])
    startTime = TimeField('startTime', validators=[
                          DataRequired(), check_time])
