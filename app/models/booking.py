from app.models import restaurant
from flask.scaffold import F
from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    startDate = db.Column(db.Date, nullable=False)
    startTime = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)

    user = db.relationship('User', back_populates='bookings')
    restaurant = db.relationship('Restaurant', back_populates='bookings')
