import React, { useState, useEffect } from 'react';
import { bookingDetails, deleteOneBooking, watchlistDetails, deleteOneWatchlist } from '../store/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch()
  const { userId }  = useParams();

  const sessionUser = useSelector((state) => state.session.user)
  const bookings = useSelector((state) => state.dashboardReducer.bookings)
  const watchlists = useSelector((state) => state.dashboardReducer.watchlists)
  const [user, setUser] = useState({});
  const [flightId, setFlightId] = useState('');
  const [watchlistId, setWatchlistId] = useState('');

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(bookingDetails(userId))
    dispatch(watchlistDetails(userId))
  }, [])


  useEffect(() => {
    if(flightId) {
      dispatch(deleteOneBooking({flightId}))
      window.location.reload();
    }
  }, [flightId])

  useEffect(() => {
    if(watchlistId) {
      dispatch(deleteOneWatchlist(watchlistId))
      window.location.reload();
    }
  }, [watchlistId])

  if(!sessionUser) {
    return null;
  }
  return (
    <div>
      <div>
        Welcome {sessionUser.first_name}
      </div>
      <div>
        <h3>Bookings</h3>
        <ul>
          {bookings && bookings.bookings_list.map((details) => (
            <li key={details.id}>
                <div>Airline: {details.airline}</div>
                <div>Price: ${details.price}</div>
                <div>Leaving from {details.city_from}</div>
                <div>Arriving in {details.city_to}</div>
                <div>On {details.depart_date}</div>
                <button onClick={(() => setFlightId(details.id))}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Watchlists</h3>
        <ul>
          {watchlists && watchlists.watchlist_list.map((details) => (
            <li key={details.id}>
                <div>Departure Date: {details.depart_date}</div>
                <div>Destination: {details.destination}</div>
                <div>Price: {details.price ? `Less than $${details.price}`: 'Unlimited'}</div>
                <button onClick={(() => setWatchlistId(details.id))}>Cancel Watchlist</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Dashboard;
