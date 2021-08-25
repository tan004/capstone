from .db import db


class Cuisine(db.Model):
    __tablename__ = 'cuisines'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)

    restaurant = db.relationship('Restaurant', back_populates='cuisine_type')
