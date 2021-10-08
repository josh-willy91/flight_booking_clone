import os
from flask import Flask,  Blueprint, request
from flask_login import login_required
from app.models import db, User, Booking

bookings_routes = Blueprint('bookings', __name__)

@bookings_routes.route('<path:id>')
@login_required
def get_bookings(id):
    """
    Get all bookings associated to logged in user
    """
    bookings_query = Booking.query.filter_by(user_id = id).all()
    booking_list = [booking.to_dict() for booking in bookings_query]
    return {'bookings_list': booking_list}


@bookings_routes.route('delete', methods=['DELETE'])
@login_required
def delete_booking():
    """
    Delete a booking based on the json payload provided by front end user
    """
    request_payload = request.get_json()
    flight_id = request_payload['flightId']

    delete_booking = Booking.query.get(flight_id)
    db.session.delete(delete_booking)
    db.session.commit()

    return {'confirmation': 'Your booking was deleted'}


@bookings_routes.route('create', methods=['POST'])
@login_required
def create_booking():
    """
    Create a booking from json payload provided by front end user
    """
    # Key into json object and assign to variable
    request_payload = request.get_json()
    # Deconstruct payload object
    user_id = request_payload['userId']
    city_from = request_payload['cityFrom']
    city_to = request_payload['cityTo']
    price = request_payload['price']
    flight_num = request_payload['flightNum']
    airline = request_payload['airline']
    depart_date = request_payload['departDate']
    arrival_date = request_payload['arrivalDate']
    trip_return = request_payload['tripReturn']

    # Add users booking through SQLAlchemy ORM
    add_booking = Booking(
        city_from = city_from,
        city_to = city_to,
        price = price,
        flight_num = flight_num,
        airline = airline,
        depart_date = depart_date,
        arrival_date = arrival_date,
        trip_return = trip_return,
        user_id = user_id,
    )
    db.session.add(add_booking)
    db.session.commit()
    return {'confirmBooking': 'Flight booked successfully'}
