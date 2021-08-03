import React, { useState, useEffect } from 'react';
import { bookingDetails, deleteOneBooking, watchlistDetails, deleteOneWatchlist, createOneBooking, createOneWatchlist } from '../store/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/dashboard.css'

function Dashboard() {
  const dispatch = useDispatch()
  const { userId }  = useParams();

  const sessionUser = useSelector((state) => state.session.user)
  const bookings = useSelector((state) => state.dashboardReducer.bookings)
  const watchlists = useSelector((state) => state.dashboardReducer.watchlists)

  const [user, setUser] = useState({});
  const [flightId, setFlightId] = useState('');
  const [watchlistId, setWatchlistId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [start, setStart] = useState('');
  const [tripReturn, setTripReturn] = useState('');

  const updateOrigin = (event) => setOrigin(event.target.value)
  const updateDestination = (event) => setDestination(event.target.value)
  const updateStart = (event) => setStart(event.target.value)
  const updateReturn = (event) => setTripReturn(event.target.value)
  const updatePrice = (event) => setPrice(event.target.value)

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

  const submitWatchlistForm = (event) => {
    event.preventDefault()

    if(price === '') {
      setPrice(null)
      console.log('============price is false=====================')
    }
    // console.log(price === '')
    const payload = {
      'origin': origin,
      'destination': destination,
      'price': price,
      'start': start,
      'tripReturn': tripReturn,
      'userId': userId
    }
    console.log(payload, '==================')
    dispatch(createOneWatchlist(payload))
  }

  const getLastIATA = (array) => {
    const nested = array.itineraries[0].segments
    const length = nested.length - 1;
    return nested[length].arrival.iataCode
  }

  const getLastDeparture = (array) => {
    const nested = array.itineraries[0].segments
    const length = nested.length - 1;
    return nested[length].departure.at
  }


  // formatISO(date, [options]) syntax for function
  // formats the data string returned from query
  // ('+020201-06-26T00:00:00.000Z')
  const format = function(dateString) {
    const spitTime = dateString.split('T').join(' ')
    // const result = format(spitTime, 'eeee do MMMM')
    return spitTime;
  };

  // const showHideElements = () => {
  //   let show = document.getElementById('showHide')

  //   if(show.classList === 'show') {
  //     show.classList.remove('show')
  //     show.classList.add('hidden')
  //   } else {
  //     show.classList.remove('hidden')
  //     show.classList.add('show')
  //   }
  // }


  if(!sessionUser) {
    return null;
  }
  return (
    <div className='dashboardDiv'>
      <div>
        Welcome {sessionUser.first_name}
      </div>
      <div className='bookingsDiv'>
        <h3>Bookings</h3>
        <ul className='bookingsUl'>
          {bookings && bookings.bookings_list.map((details) => (
            <li className='bookingsLi' key={details.id}>
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
      <div className='watchlistsDiv'>
        <h3>Watchlists</h3>
        <button className='watchlistsShowP'>?</button>
        <p className='watchlistsP'>What is a watchlist?... It's a convinient way to track flights you may be interested in.
          Simply create a watchlist for a destination you'd like to go to.
          Search filters, such as price, will only show flights that meet all criteria.</p>
        <button className='watchlistsCreate'>Create New Watchlist</button>
        <div className='watchlistsFormDiv'>
          <form className='watchlistsForm' onSubmit={submitWatchlistForm}>
            <div>
              <label>Origin Airport</label>
              <input
                type = 'text'
                placeholder='Origin'
                name='origin'
                value={origin}
                required
                onChange={updateOrigin}
              ></input>
            </div>
            <div>
              <label>Destination Airport</label>
              <input
                type = 'text'
                placeholder='Destination'
                name='destination'
                value={destination}
                required
                onChange={updateDestination}
              ></input>
            </div>
            <div>
              <label>Set a price limit</label>
              <input
                type = 'text'
                placeholder='Price'
                name='price'
                value={price}
                onChange={updatePrice}
              ></input>
            </div>
            <div>
              <label>Departure Date</label>
              <input
                type = 'date'
                placeholder='Departure Date'
                name='departDate'
                value={start}
                required
                onChange={updateStart}
              ></input>
            </div>
            <div>
              <label>Return Date</label>
              <input
                type = 'date'
                placeholder='Return Date'
                name='tripReturn'
                value={tripReturn}
                required
                onChange={updateReturn}
              ></input>
            </div>
            <button type='submit'>Create Watchlist</button>
          </form>
        </div>
        <div className='watchlistsSearchDiv'>
          <ul className='watchlistsSearchUl'>
            {watchlists && watchlists.watchlist_list.map((details) => (
              <li className='watchlistsSearchLi' key={details.id}>
                  <h3>Watchlist Search Criteria</h3>
                  <div>Leaving from {details.origin}</div>
                  <div>Departure Date: {details.depart_date}</div>
                  <div>Destination: {details.destination}</div>
                  <div>Return flight leaves: {details.trip_return}</div>
                  <div>Price: {details.price ? `Less than $${details.price}`: 'No limit set'}</div>
                  <button onClick={(() => setWatchlistId(details.id))}>Cancel Watchlist</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='watchlistsResultsDiv'>
        <ul className='watchlistsResultsUl'>
          {watchlists && watchlists.watchlist_data_obj.watchlist_results_4.map((flight) => (
            <li className='watchlistsResultsLi' key={flight.id}>
                <h3>Watchlist Search Results</h3>
                <div>
                    {flight.oneWay === true ?
                    <div>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</div> :
                    <div>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {getLastIATA(flight)}</div>
                    }
                </div>
                <div>
                    {flight.oneWay === true ?
                    <div>One Way: Yes</div> :
                    <div>Layovers: {flight.itineraries[0].segments.length - 1}</div>
                    }
                </div>
                <div>Departs: {format(flight.itineraries[0].segments[0].departure.at)}</div>
                <div>Arrival: {format(flight.itineraries[0].segments[0].arrival.at)}</div>
                <div>Return Flight: {format(getLastDeparture(flight))}</div>
                <div>Price: ${flight.price.total}</div>
                <div>Airline Code: {flight.validatingAirlineCodes[0]}</div>
                <div>Flight Number: {flight.validatingAirlineCodes[0]}{flight.itineraries[0].segments[0].number}</div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
