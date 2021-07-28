import os
from flask import Flask,  Blueprint, render_template, request, session, redirect
from flask_login import login_required
from app.models import User, Watchlist

watchlists_routes = Blueprint('watchlists', __name__)

@watchlists_routes.route('<path:id>')
@login_required
def get_watchlists(id):
    watchlists_query = Watchlist.query.filter_by(user_id = id).all()
    watchlist_list = [watchlist.to_dict() for watchlist in watchlists_query]
    return {'watchlist_list': watchlist_list}
