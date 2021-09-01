from app.models import booking
from app.models.booking import Booking
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from ..models.db import db

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
    bookings = Booking.query.filter(Booking.user_id == id).order_by(
        Booking.startDate, Booking.startTime).all()
    return {booking.id: booking.to_dict() for booking in bookings}


@user_routes.route('/<int:user_id>/<int:id>/removebooking', methods=['DELETE'])
def remove_user_booking(id, user_id):
    user = User.query.get(user_id)
    if user.id != current_user.id:
        return {'errors': 'You cannot delete other users reservation'}, 401

    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()

    return booking.to_dict()
