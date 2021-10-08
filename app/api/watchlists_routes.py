from logging import error
import os
from re import search
# import amadeus
from flask import Flask,  Blueprint, request
from flask.wrappers import Response
from flask_login import login_required
from app.models import db, User, Watchlist
from datetime import date
from amadeus import Client, ResponseError


watchlists_routes = Blueprint('watchlists', __name__)

@watchlists_routes.route('<path:id>')
@login_required
def get_watchlists(id):
    """
    Get all user's watchlist flights to run flight search on Amadeus
    """
    search_results = {}
    # Query database where logged in user's id matches id in database and return all results
    watchlists_query = Watchlist.query.filter_by(user_id = id).all()
    # Loop through each watchlist a user has and store in list of objects
    watchlist_list = [watchlist.to_dict() for watchlist in watchlists_query]

    # loop through list to pull data from objects/dict
    for watchlist_obj in watchlist_list:

        id = watchlist_obj['id']
        origin = watchlist_obj['origin'].upper()
        destination = watchlist_obj['destination'].upper()
        departure_date = watchlist_obj['depart_date']
        trip_return = watchlist_obj['trip_return']
        price = watchlist_obj['price']
        num_adults = 1

        today = date.today()
        # Edge case error handling if watchlist date has already passed then give false value to search_result object which will be returned
        if today > departure_date:
            search_results[f'{id}'] = [False]

        # Conditional to check if no price is stored in watchlist so call to Amadeus has no null values for price
        if(price == None):
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
                # Store API call response in search_result object to be returned
                search_results[f'{id}'] = response.data
            except ResponseError as error:
                print(error)

        # If price is provided in watchlist then run this API call to Amadeus
        else:
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
                    maxPrice = int(price),
                    adults = 1,
                    currencyCode = 'USD',
                    max = 50,
                )
                # Store API call response in search_result object to be returned
                search_results[f'{id}'] = response.data
            except ResponseError as error:
                print(error)

    # return both the search_result object of Amadeus API call response and all user's watchlist flight info as list
    return {'watchlist_list': watchlist_list, 'watchlist_data_obj': search_results}


@watchlists_routes.route('delete', methods=['DELETE'])
@login_required
def delete_watchlist():
    """
    Delete a user's watchlist based on the provided watchlist id from front end
    """
    watchlist_id = request.get_json()

    delete_watchlist = Watchlist.query.get(watchlist_id)
    db.session.delete(delete_watchlist)
    db.session.commit()
    return {'confirmation': 'Your booking was deleted'}


@watchlists_routes.route('create', methods=['POST'])
@login_required
def create_watchlist():
    """
    Create a new watchlist based on the flight criteria provided on front end
    """
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


@watchlists_routes.route('edit', methods=['POST'])
@login_required
def edit_watchlist():
    """
    Edits a user's watchlist based on info provided on front end
    """
    request_payload = request.get_json()
    user_id = request_payload['userId']
    destination = request_payload['destination']
    origin = request_payload['origin']
    price = request_payload['price']
    depart_date = request_payload['start']
    trip_return = request_payload['tripReturn']

    watchlist_id = request_payload['watchlistId']

    # Query watchlists to grab the watchlist that matches the provided watchlist ID in order to edit
    watchlist_to_edit = Watchlist.query.get(watchlist_id)

    # Re-assign values of watchlist that we are editing
    watchlist_to_edit.destination = destination
    watchlist_to_edit.origin = origin
    watchlist_to_edit.price = price
    watchlist_to_edit.depart_date = depart_date
    watchlist_to_edit.trip_return = trip_return

    # Commit all changed to database
    db.session.commit()
    return {'confirmation': 'Watchlist added successfully'}
