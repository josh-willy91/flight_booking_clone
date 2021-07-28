import os
from flask import Flask,  Blueprint, request
from flask_login import login_required
from app.models import db, User, Watchlist

watchlists_routes = Blueprint('watchlists', __name__)

@watchlists_routes.route('<path:id>')
@login_required
def get_watchlists(id):
    watchlists_query = Watchlist.query.filter_by(user_id = id).all()
    watchlist_list = [watchlist.to_dict() for watchlist in watchlists_query]
    return {'watchlist_list': watchlist_list}


@watchlists_routes.route('delete', methods=['DELETE'])
@login_required
def delete_watchlist():
    watchlist_id = request.get_json()

    delete_watchlist = Watchlist.query.get(watchlist_id)
    db.session.delete(delete_watchlist)
    db.session.commit()

    print(delete_watchlist, '===================================')
    return {'confirmation': 'Your booking was deleted'}
