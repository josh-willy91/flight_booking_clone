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


@bookings_routes.route('create', methods=['POST'])
@login_required
def create_booking():
    request_payload = request.get_json()
    userId = request_payload['userId']
    city_from = request_payload['cityFrom']
    city_to = request_payload['cityTo']
    price = request_payload['price']
    flight_Num = request_payload['flightNum']
    depart_date = request_payload['departDate']
    arrival_date = request_payload['arrivalDate']
    print(userId ,city_from, city_to, price, flight_Num,
    depart_date, arrival_date, '============================================')

    return {}
