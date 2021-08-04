import os
import amadeus
import requests
from flask import Flask,  Blueprint, request
from app.models import db, User, Booking
from amadeus import Client

home_routes = Blueprint('bookyeah', __name__)


@home_routes.route('search', methods=['POST'])
def search_flights():
    request_payload = request.get_json()
    user_id = request_payload['userId']
    origin = request_payload['origin']
    destination = request_payload['destination']
    departure_date = request_payload['start']
    return_date = request_payload['end']

    amadeus = Client(
        client_id=os.environ.get('API_PUBLIC_KEY'),
        client_secret=os.environ.get('API_SECRET_KEY')
    )
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode = origin,
        destinationLocationCode = destination,
        departureDate = departure_date,
        returnDate = return_date,
        adults = 1,
        currencyCode = 'USD',
        max = 50,
    )
    # print(response.data)
    return {'flight': response.data}


    # bookings_query = Booking.query.filter_by(user_id = id).all()
    # booking_list = [booking.to_dict() for booking in bookings_query]

# https://test.api.amadeus.com/v2/shopping/flight-offers?
# https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JAX&destinationLocationCode=MCO&departureDate=2021-07-30&adults=1&nonStop=false&max=5

# originLocationCode  -  required
# destinationLocationCode  -  required
# departureDate  -  required  yyyy-mm-dd
# returnDate
# adults  -  required
# children
# infants
# travelClass
# includedAirlineCodes
# excludedAirlineCodes
# nonStop
# currencyCode
# maxPrice
# max


# var Amadeus = require('amadeus');
# var amadeus = new Amadeus({
#   clientId: '[API Key]',
#   clientSecret: '[API Secret]'
# });


# curl "https://test.api.amadeus.com/v1/security/oauth2/token" \
#      -H "Content-Type: application/x-www-form-urlencoded" \
#      -d "grant_type=client_credentials&client_id=OrqwG35hQmS4LctB3lgkyKOpvjEGK5S1&client_secret=WA4x1CU6XtOUz9Ge"

#         {
#             "type": "amadeusOAuth2Token",
#             "username": "jwilly91812@yahoo.com",
#             "application_name": "bookyeah - flight search app for resume",
#             "client_id": "OrqwG35hQmS4LctB3lgkyKOpvjEGK5S1",
#             "token_type": "Bearer",
#             "access_tkn": "kj24SeVhY7ht4AsOVaiJVjjkFk2g",
#             "expires_in": 1799,
#             "state": "approved",
#             "scope": ""
#         }


# [{'type': 'flight-offer', 'id': '1', 'source': 'GDS', 'instantTicketingRequired': False, 'nonHomogeneous': False, 'oneWay': False,
# 'lastTicketingDate': '2021-07-29', 'numberOfBookableSeats': 9, 'itineraries': [{'duration': 'PT13H43M',
# 'segments': [{'departure': {'iataCode': 'JAX', 'at': '2021-07-30T18:55:00'},
# 'arrival': {'iataCode': 'EWR', 'terminal': 'A', 'at': '2021-07-30T21:23:00'},
# 'carrierCode': 'B6', 'number': '664', 'aircraft': {'code': 'E90'}, 'operating': {'carrierCode': 'B6'},
# 'duration': 'PT2H28M', 'id': '1', 'numberOfStops': 0, 'blacklistedInEU': False},
# {'departure': {'iataCode': 'EWR', 'terminal': 'A', 'at': '2021-07-31T06:00:00'}, 'arrival': {'iataCode': 'MCO', 'at': '2021-07-31T08:38:00'},
# 'carrierCode': 'B6', 'number': '327', 'aircraft': {'code': '32Q'}, 'operating': {'carrierCode': 'B6'}, 'duration': 'PT2H38M', 'id': '2', 'numberOfStops': 0,
# 'blacklistedInEU': False}]}], 'price': {'currency': 'USD', 'total': '311.20', 'base': '262.70', 'fees': [{'amount': '0.00', 'type': 'SUPPLIER'},
# {'amount': '0.00', 'type': 'TICKETING'}], 'grandTotal': '311.20'}, 'pricingOptions': {'fareType': ['PUBLISHED'], 'includedCheckedBagsOnly': False},
# 'validatingAirlineCodes': ['B6'], 'travelerPricings': [{'travelerId': '1', 'fareOption': 'STANDARD', 'travelerType': 'ADULT', 'price': {'currency': 'USD',
# 'total': '311.20', 'base': '262.70'}, 'fareDetailsBySegment': [{'segmentId': '1', 'cabin': 'ECONOMY', 'fareBasis': 'RC0JUEL1', 'brandedFare': 'DN',
# 'class': 'L', 'includedCheckedBags': {'quantity': 0}}, {'segmentId': '2', 'cabin': 'ECONOMY', 'fareBasis': 'ZI0ABEL1', 'brandedFare': 'DN', 'class': 'L',
# 'includedCheckedBags': {'quantity': 0}}]}]}]
