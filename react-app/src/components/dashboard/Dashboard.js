import React, { useState, useEffect } from 'react';
import { bookingDetails, deleteOneBooking, watchlistDetails, deleteOneWatchlist, createOneBooking, createOneWatchlist } from '../../store/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import WatchlistForm from './WatchlistForm';
import ModalWatchlistForm from './ModalWatchlistForm';
import Bookings from './Bookings';
import WatchlistSearch from './WatchlistSearch';
import './styles/dashboard.css'


function Dashboard() {
  const dispatch = useDispatch()
  const { userId } = useParams();

  const sessionUser = useSelector((state) => state.session.user)
  // const bookings = useSelector((state) => state.dashboardReducer.bookings)
  // const watchlists = useSelector((state) => state.dashboardReducer.watchlists)

  const [user, setUser] = useState({});
  const [flightId, setFlightId] = useState('');
  const [watchlistId, setWatchlistId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [start, setStart] = useState(false);
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

  useEffect(async () => {
    if (flightId) {
      await dispatch(deleteOneBooking({ flightId }))
      window.location.reload();
    }
  }, [flightId])

  const deleteWatchlist = async (watchlistId) => {
    await dispatch(deleteOneWatchlist(watchlistId))
    window.location.reload();
  }


  if (!sessionUser) {
    return null;
  }
  return (
    <div className='dashboardDiv'>
      <Bookings setFlightId={setFlightId} />
      <div className='watchlistsDiv'>
        <WatchlistForm origin={origin} setOrigin={setOrigin} destination={destination}
          setDestination={setDestination} price={price} setPrice={setPrice} start={start}
          setStart={setStart} tripReturn={tripReturn} setTripReturn={setTripReturn} />
        <ModalWatchlistForm origin={origin} setOrigin={setOrigin} destination={destination}
          setDestination={setDestination} price={price} setPrice={setPrice} start={start}
          setStart={setStart} tripReturn={tripReturn} setTripReturn={setTripReturn}
          watchlistId={watchlistId} openModal={openModal} closeModal={() => setOpenModal(false)} />
        <WatchlistSearch setOpenModal={setOpenModal} setWatchlistId={setWatchlistId}
          deleteWatchlist={deleteWatchlist} />
      </div>
    </div>
  );
}
export default Dashboard;
