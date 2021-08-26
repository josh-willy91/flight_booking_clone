import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.bookings_routes import bookings_routes
from .api.watchlists_routes import watchlists_routes
from .api.home_routes import home_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)
CORS(app)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(home_routes, url_prefix='/api/bookyeah')
app.register_blueprint(bookings_routes, url_prefix='/api/bookings')
app.register_blueprint(watchlists_routes, url_prefix='/api/watchlists')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    if path == 'images/gitHub.jpg':
        return app.send_static_file('images/gitHub.jpg')
    if path == 'images/linkedIn.jpg':
        return app.send_static_file('images/linkedIn.jpg')
    if path == 'images/login.jpg':
        return app.send_static_file('images/login.jpg')
    if path == 'images/searchBackground.jpg':
        return app.send_static_file('images/searchBackground.jpg')
    if path == 'images/signup.jpg':
        return app.send_static_file('images/signup.jpg')
    if path == 'images/plane.jpg':
        return app.send_static_file('images/plane.jpg')
    if path == 'landing-1.jpg':
        return app.send_static_file('images/landing-1.jpg')
    if path == 'images/landing-2.jpg':
        return app.send_static_file('images/landing-2.jpg')
    if path == 'images/landing-3.jpg':
        return app.send_static_file('images/landing-3.jpg')
    if path == 'images/landing-4.jpg':
        return app.send_static_file('images/landing-4.jpg')
    if path == 'images/landing-5.jpg':
        return app.send_static_file('images/landing-5.jpg')
    if path == 'images/landing-6.jpg':
        return app.send_static_file('images/landing-6.jpg')
    return app.send_static_file('index.html')
