from app.models import db, Booking


# Adds a demo user, you can add other users here if you want
def seed_bookings():
    demo = Booking(
        city_from = 'Jacksonville',
        city_to = 'Orlando',
        price = 187.00,
        flight_num = 'A18310003',
        airline = 'American Airlines',
        depart_date= '08/12/2021',
        arrival_date= '08/12/2021',
        user_id = 1,
        )
    marnie = Booking(
        city_from = 'Orlando',
        city_to = 'Miami',
        price = 212.00,
        flight_num = 'A21310009',
        airline = 'Delta',
        depart_date= '08/15/2021',
        arrival_date= '08/15/2021',
        user_id = 1,
        )
    bobbie = Booking(
        city_from = 'Miami',
        city_to = 'Jacksonville',
        price = 392.00,
        flight_num = 'B65310012',
        airline = 'Spirit',
        depart_date= '08/14/2021',
        arrival_date= '08/14/2021',
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
def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
