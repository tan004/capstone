from app.models.restaurant import Restaurant
from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    startDate = db.Column(db.Date, nullable=False)
    startTime = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        'restaurants.id'), nullable=False)

    user = db.relationship('User', back_populates='bookings')
    restaurant = db.relationship('Restaurant', back_populates='bookings')

    def to_dict(self):
        restaurant = Restaurant.query.get(self.restaurant_id)

        return {
            'id': self.id,
            'user_id': self.user_id,
            'size': self.size,
            'restaurant_id': self.restaurant_id,
            'startDate': self.startDate.strftime(format=f'%m/%d/%Y'),
            'startTime': self.startTime.strftime(format=f'%H:%M'),
            'time': f'{self.startDate} {self.startTime}',
            'restaurant': restaurant.to_dict()
        }
