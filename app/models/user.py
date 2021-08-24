from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    icon = db.Column(db.String, nullable=True)

    restaurants = db.relationship("Restaurant", back_populates="owner")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        icon_url = self.icon

        if icon_url is None:
            icon_url = None
        else:
            icon_url = self.icon
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'icon': icon_url,
        }
