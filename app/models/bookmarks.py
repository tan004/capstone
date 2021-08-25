from .db import db

bookmarks = db.Table(
    "bookmarks",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("restaurant_id", db.Integer, db.ForeignKey("restaurants.id")),
)
