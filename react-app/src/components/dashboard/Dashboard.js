import React, { useState, useEffect } from 'react';
import { bookingDetails, deleteOneBooking, watchlistDetails, deleteOneWatchlist, createOneBooking, createOneWatchlist } from '../../store/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import WatchlistForm from './WatchlistForm';
import ModalWatchlistForm from './ModalWatchlistForm';
import Bookings from './Bookings';
import '../../styles/dashboard.css'


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

  const [openModal, setOpenModal] = useState(false)


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

  useEffect(async() => {
    if(flightId) {
      await dispatch(deleteOneBooking({flightId}))
      window.location.reload();
    }
  }, [flightId])

  const deleteWatchlist = async(watchlistId) => {
    await dispatch(deleteOneWatchlist(watchlistId))
    window.location.reload();
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
      <Bookings setFlightId={setFlightId}/>
      <div className='watchlistsDiv'>
        <WatchlistForm origin={origin} setOrigin={setOrigin} destination={destination}
        setDestination={setDestination} price={price} setPrice={setPrice} start={start}
        setStart={setStart} tripReturn={tripReturn} setTripReturn={setTripReturn}/>
        <ModalWatchlistForm origin={origin} setOrigin={setOrigin} destination={destination}
        setDestination={setDestination} price={price} setPrice={setPrice} start={start}
        setStart={setStart} tripReturn={tripReturn} setTripReturn={setTripReturn}
        watchlistId={watchlistId} openModal={openModal} closeModal={() => setOpenModal(false)}/>
        <div className='watchlistsSearchDiv'>
          <ul className='watchlistsSearchUl'>
            {watchlists && watchlists.watchlist_list.map((details) => (
              <li className='watchlistsSearchLi' key={details.id}>
                <div className='searchCriteriaDiv'>
                  <h3>Watchlist Search Criteria</h3>
                  <div>Leaving from {details.origin}</div>
                  <div>Departure Date: {details.depart_date}</div>
                  <div>Destination: {details.destination}</div>
                  <div>Return flight leaves: {details.trip_return}</div>
                  <div>Price: {details.price ? `Less than $${details.price}`: 'No limit set'}</div>
                  <div>
                    <button onClick={() => deleteWatchlist(details.id)}>Delete Watchlist</button>
                    <button onClick={() => {
                      setOpenModal(true)
                      setWatchlistId(details.id)}
                    }> Edit Watchlist</button>
                  </div>
                </div>
                <div className='carousel'>
                  {watchlists.watchlist_data_obj[`${details.id}`].map((flight) => (
                    <li className='carousel_item' key={flight.id}>
                      <div>
                          {flight.oneWay === true ?
                          <p>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</p> :
                          <p>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {getLastIATA(flight)}</p>
                          }
                      </div>
                      <div>
                          {flight.oneWay === true ?
                          <p>One Way: Yes</p> :
                          <p>Layovers: {flight.itineraries[0].segments.length - 1}</p>
                          }
                      </div>
                      <div>
                          <p>Departs: {format(flight.itineraries[0].segments[0].departure.at)}</p>
                      </div>
                      <div>
                          <p>Arrival: {format(flight.itineraries[0].segments[0].arrival.at)}</p>
                      </div>
                      <div>
                          <p>Return Flight: {format(getLastDeparture(flight))}</p>
                      </div>
                      <div>
                          <p>Price: ${flight.price.total}</p>
                      </div>
                      <div>
                          <p>Airline Code: {flight.validatingAirlineCodes[0]}</p>
                      </div>
                      <div>
                          <p>Flight Number: {flight.validatingAirlineCodes[0]}{flight.itineraries[0].segments[0].number}</p>
                      </div>
                    </li>
                  ))}
                </div>
                {/* <div className='carousel_actions'>
                  <button id='carousel_Button--Prev' aria-label='previous slide'>Previous Slide</button>
                  <button id='carousel_Button--Next' aria-label='next slide'>Next Slide</button>
                </div> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
