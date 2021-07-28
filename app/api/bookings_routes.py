import os
from flask import Flask,  Blueprint, request
from flask_login import login_required
from app.models import db, User, Booking

bookings_routes = Blueprint('bookings', __name__)

@bookings_routes.route('<path:id>')
@login_required
def get_bookings(id):
    bookings_query = Booking.query.filter_by(user_id = id).all()
    booking_list = [booking.to_dict() for booking in bookings_query]
    # print(booking_list, '================================')
    return {'bookings_list': booking_list}


@bookings_routes.route('delete', methods=['DELETE'])
@login_required
def delete_booking():
    request_payload = request.get_json()
    flight_id = request_payload['flightId']

    delete_booking = Booking.query.get(flight_id)
    db.session.delete(delete_booking)
    db.session.commit()

    return {'confirmation': 'Your booking was deleted'}
