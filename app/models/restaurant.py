from .db import db
from .user import User
from .bookmarks import bookmarks


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
    profile_pic = db.Column(db.String, nullable=False)
    lat = db.Column(db.String, nullable=True)
    lng = db.Column(db.String, nullable=True)

    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    owner = db.relationship("User", back_populates="restaurants")

    bookings = db.relationship('Booking', back_populates='restaurant')
    cuisine_type = db.relationship(
        'Cuisine', cascade="all,delete", back_populates='restaurant')

    bookmark_users = db.relationship(
        'User', secondary=bookmarks, back_populates="bookmarked")

    images = db.relationship('Image', back_populates='restaurant')

    def to_dict(self):
        user = User.query.filter(User.id == self.owner_id).first()

        return {
            "id": self.id,
            "title": self.title,
            "phone": self.phone,
            "description": self.description,
            "owner": user.to_dict(),
            "profile_pic": self.profile_pic,
            "lat": self.lat,
            "lng": self.lng,
            "city": self.city,
            "address": self.address,
            "state": self.state,
            "zip_code": self.zip_code,
            "location": f"{self.address} {self.city}, {self.state} {self.zip_code}",
            "len_bookmark": len(self.bookmark_users),
            "cuisine_type": [cuisine.type for cuisine in self.cuisine_type],
            "bookmark_users": [user.id for user in self.bookmark_users],
            "images": [image.to_dict() for image in self.images]
        }

    def simple_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "profile_pic": self.profile_pic,
        }
