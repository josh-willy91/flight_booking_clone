from .db import db
from sqlalchemy.sql import func


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String)
    price = db.Column(db.Float(8, 2))
    depart_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, onupdate=func.now())
    user = db.relationship("User", back_populates="watchlist")

    def to_dict(self):
        return {
            'id': self.id,
            'destination': self.destination,
            'price': self.price,
            'depart_date': self.depart_date,
            'arrival_date': self.arrival_date,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
