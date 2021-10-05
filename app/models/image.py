from .db import db


class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    imgUrl = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        'restaurants.id'), nullable=False)

    user = db.relationship("User", back_populates="images")
    restaurant = db.relationship("Restaurant", back_populates="images")

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'imgUrl': self.imgUrl,
            'restaurant': self.restaurant.title
        }
