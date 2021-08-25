from .db import db
from .user import User


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(20), nullable=False)
    lat = db.Column(db.String, nullable=True)
    lng = db.Column(db.String, nullable=True)

    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    owner = db.relationship("User", back_populates="restaurants")

    bookings = db.relationship('Booking', back_populates='restaurant')
    cuisine_type = db.relationship('Cuisine', back_populates='restaurant')

    def to_dict(self):
        user = User.query.filter(User.id == self.owner_id).first()

        return {
            "id": self.id,
            "title": self.title,
            "phone": self.phone,
            "description": self.description,
            "owner": user.to_dict(),
            "lat": self.lat,
            "lng": self.lng,
            "location": f"{self.address} {self.city}, {self.state} {self.zip_code}"
        }
