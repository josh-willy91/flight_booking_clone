from .db import db
from sqlalchemy.sql import func


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    origin = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)
    price = db.Column(db.Float(8, 2))
    depart_date = db.Column(db.DateTime, nullable=False)
    trip_return = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, onupdate=func.now())
    user = db.relationship("User", back_populates="watchlist")

    def to_dict(self):
        if self.price:
            return {
                'id': self.id,
                'origin': self.origin,
                'destination': self.destination,
                'price': float(self.price),
                'depart_date': self.depart_date,
                'trip_return': self.trip_return,
                'createdAt': self.createdAt,
                'updatedAt': self.updatedAt,
            }
        else:
            return {
                'id': self.id,
                'origin': self.origin,
                'destination': self.destination,
                'price': self.price,
                'depart_date': self.depart_date,
                'trip_return': self.trip_return,
                'createdAt': self.createdAt,
                'updatedAt': self.updatedAt,
            }
