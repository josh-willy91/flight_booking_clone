import os
from flask import Flask,  Blueprint, request
from flask_login import login_required
from app.models import User, Booking

bookings_routes = Blueprint('bookings', __name__)

@bookings_routes.route('<path:id>')
@login_required
def get_bookings(id):
    bookings_query = Booking.query.filter_by(user_id = id).all()
    booking_list = [booking.to_dict() for booking in bookings_query]
    # print(booking_list, '================================')
    return {'bookings_list': booking_list}


@bookings_routes.route('delete')
@login_required
def delete_booking():
    print('============================= inside backend ======')
    request_payload = request.get_json()
    # id = request_payload['userId']
    print(request_payload, '===================================')
    return {}
