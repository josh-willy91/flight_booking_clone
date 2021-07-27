from .db import db
from sqlalchemy.sql import func


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    city_from = db.Column(db.Varchar, nullable=False)
    city_to = db.Column(db.Varchar, nullable=False)
    price = db.Column(db.Float(8, 2), nullable=False)
    flight_num = db.Column(db.Varchar, nullable=False)
    airline = db.Column(db.Varchar, nullable=False)
    depart_date = db.Column(db.DateTime, nullable=False)
    arrival_date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Intger, db.ForeignKey('user.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, onupdate=func.now())
    user = db.relationship("User", back_populates="booking")

    def to_dict(self):
        return {
            'id': self.id,
            'city_from': self.city_from,
            'city_to': self.city_to,
            'price': self.price,
            'flight_num': self.flight_num,
            'airline': self.airline,
            'depart_date': self.depart_date,
            'arrival_date': self.arrival_date,
            'user_id': self.user_id,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
