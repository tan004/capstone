from app.models import booking
from app.models.booking import Booking
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/one')
@login_required
def user_bookings(id):
    bookings = Booking.query.filter(Booking.user_id == id).order_by(Booking.startDate, Booking.startTime).all()
    print('xxxxxx', bookings)
    return {booking.id: booking.to_dict() for booking in bookings}
