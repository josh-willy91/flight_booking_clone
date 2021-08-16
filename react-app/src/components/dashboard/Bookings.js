import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneWatchlist } from '../../store/dashboard';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import '../../styles/modalWatchlistForm.css'


function Bookings({setFlightId}) {

    const bookings = useSelector((state) => state.dashboardReducer.bookings)


    const daysUntilFlight = (departDate) => {
        let today = new Date()
        let format = new Date(departDate)
        let value = differenceInCalendarDays(format, today)
        if(value === 0) {
            return 'Your flight departs today!!!'
        } else if(value < 0) {
            return null
        }
        return `${value} days until flight departure`
    }


    return (
        <div className='bookingsDiv'>
            <h3>Bookings</h3>
            <ul className='bookingsUl'>
            {bookings && bookings.bookings_list.map((details) => (
                <li className='bookingsLi' key={details.id}>
                    <div>{daysUntilFlight(details.depart_date)}</div>
                    <div>Airline: {details.airline}</div>
                    <div>Price: ${details.price}</div>
                    <div>Leaving from {details.city_from}</div>
                    <div>Departs on {details.depart_date}</div>
                    <div>Arriving in {details.city_to}</div>
                    <div>On {details.depart_date}</div>
                    <div>Return flight leaves {details.trip_return}</div>
                    <button onClick={(() => setFlightId(details.id))}>Cancel Booking</button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Bookings;
