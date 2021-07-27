from sqlalchemy.sql.expression import null
from app.models import watchlist
from app.models.watchlist import Watchlist
from app.models import db, Watchlist


# Adds a demo user, you can add other users here if you want
def seed_watchlists():
    demo = Watchlist(
        destination = 'Miami',
        depart_date = '08/25/2021',
        user_id = 1,
        )
    marnie = Watchlist(
        price = 300.00,
        depart_date = '08/25/2021',
        user_id = 1,
        )
    bobbie = Watchlist(
        destination = 'Orlando',
        price = 400.00,
        depart_date = '08/20/2021',
        user_id = 1,
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
