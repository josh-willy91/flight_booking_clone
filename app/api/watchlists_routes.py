from logging import error
import os
import amadeus
from flask import Flask,  Blueprint, request
from flask.wrappers import Response
from flask_login import login_required
from app.models import db, User, Watchlist, user
from amadeus import Client, ResponseError


watchlists_routes = Blueprint('watchlists', __name__)

@watchlists_routes.route('<path:id>')
@login_required
def get_watchlists(id):
    watchlist_data_obj = {}
    watchlists_query = Watchlist.query.filter_by(user_id = id).all()
    watchlist_list = [watchlist.to_dict() for watchlist in watchlists_query]
    # print(watchlist_list, '========================================')

    for watchlist_obj in watchlist_list:

        id = watchlist_obj['id']
        origin = watchlist_obj['origin']
        destination = watchlist_obj['destination']
        departure_date = watchlist_obj['depart_date']
        trip_return = watchlist_obj['trip_return']
        price = watchlist_obj['price']
        num_adults = 1
        # print(id, origin, destination, departure_date, trip_return, price, num_adults,
        # '==============================================')

        if(price == None):
            print(price, f'================price is none===={id}============')

            amadeus = Client(
                client_id=os.environ.get('API_PUBLIC_KEY'),
                client_secret=os.environ.get('API_SECRET_KEY')
            )
            try:
                response = amadeus.shopping.flight_offers_search.get(
                    originLocationCode = origin,
                    destinationLocationCode = destination,
                    departureDate = departure_date,
                    returnDate = trip_return,
                    adults = 1,
                    currencyCode = 'USD',
                    max = 50,
                )
                # print(response.data, '=================response=============================')
                watchlist_data_obj[f'watchlist_results_{id}'] = response.data
            except ResponseError as error:
                print(error)

        else:
            print(f'==========================line 56 inside else=========={id}==============')
            amadeus = Client(
                client_id=os.environ.get('API_PUBLIC_KEY'),
                client_secret=os.environ.get('API_SECRET_KEY')
            )
            try:
                response = amadeus.shopping.flight_offers_search.get(
                    originLocationCode = origin,
                    destinationLocationCode = destination,
                    departureDate = departure_date,
                    returnDate = trip_return,
                    maxPrice = price,
                    adults = 1,
                    currencyCode = 'USD',
                    max = 50,
                )
                watchlist_data_obj[f'watchlist_results_price_{id}'] = response.data
            except ResponseError as error:
                print(error)

    # watchlist_data_obj['watchlist_list'] = watchlist_list
    # print(watchlist_data_obj, '=====================================================')
    return {'watchlist_list': watchlist_list, 'watchlist_data_obj': watchlist_data_obj}


@watchlists_routes.route('delete', methods=['DELETE'])
@login_required
def delete_watchlist():
    watchlist_id = request.get_json()

    delete_watchlist = Watchlist.query.get(watchlist_id)
    db.session.delete(delete_watchlist)
    db.session.commit()

    return {'confirmation': 'Your booking was deleted'}

@watchlists_routes.route('create', methods=['POST'])
@login_required
def create_watchlist():
    request_payload = request.get_json()
    user_id = request_payload['userId']
    destination = request_payload['destination']
    origin = request_payload['origin']
    price = request_payload['price']
    depart_date = request_payload['start']
    trip_return = request_payload['tripReturn']

    add_watchlist = Watchlist(
        origin = origin,
        destination = destination,
        price = price,
        depart_date = depart_date,
        trip_return = trip_return,
        user_id = user_id,
    )

    db.session.add(add_watchlist)
    db.session.commit()

    return {'confirmation': 'Watchlist added successfully'}
