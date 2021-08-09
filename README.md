# BookYeah
BookYeah is a rough clone of Expedia.  It mainly copies the flight booking capabilities of Expedia or other online travel agencies.  I'm a passionate traveler so creating an app that made the flight process easier and more transparent was a fun experience.  After creating the flight search feature, I definitely found myself searching for flight prices to Vienna, Honolulu, and other locations I want to visit so I hope you enjoy it as well!

# Technologies Used

## Backend
- The backend was built with Python using a postgreSQL database.  SQLAlchemy was the ORM used for interactions with the database and Alembic was used for migrations.  Flask was the framework which the backend was bulit on.

## Frontend
- The Frontend was built with JavaScript using React / Redux for an enhanced UI experience.  Styling was implemented through CSS.

## Libraries and more
- Date-fns library was used for date formatting on the frontend.
- Amadeus's API and SDK were leveraged for real time flight information.
- The App has been deployed on Heroku through Docker

# Features
BookYeah offers users the ability to:

    User Authentication
    - Log in and out
    - Create account
    - Demo user access

    Search flights
    - Search all flights with criteria to see relevent results
    - Book the flight you want

    Dashboard
    - User profile for quick and easy access to your information
    - Cancel any booking you want to remove
    - View your watchlists

    Watchlist
    - Create a watchlist that searches flights for you so you don't miss any deals
    - Edit a watchlist to alter results
    - Delete a watchlist that you no longer require

# Highlights
- I love working with external APIs to get real time data.  In the planning phase of this project I looked into a lot of different flight APIs but decided on Amadeus for their clear documentation and free access for up to 2,000 requests for flight info.  It was also my first time using an SDK to request data which was fun and super easy.

# Wiki

Please refer to my GitHub's wiki for more details about the app.  I love working on new projects so any developer wanting to colaborate please reach out via linked-In or my email on linked-In.

[live link to Wiki](https://github.com/josh-willy91/flight_booking_clone/wiki)

[live link to LinkIn](https://www.linkedin.com/in/joshua-williams-768b48178/)

[live link to GitHub](https://github.com/josh-willy91)
