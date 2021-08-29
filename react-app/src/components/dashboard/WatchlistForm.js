import React, { useState, useEffect } from 'react';
import { createOneWatchlist } from '../../store/dashboard';
import ModalWatchlistQuestion from './ModalWatchlistQuestion';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './styles/dashboard.css'



function WatchlistForm({ origin, setOrigin, destination, setDestination,
    price, setPrice, start, setStart, tripReturn, setTripReturn, openModal, closeModal }) {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const [errors, setErrors] = useState(false);

    function formDate(date) {
        const intoMilli = Date.parse(date)
        const day = 60 * 60 * 24 * 1000;
        const departureDate = new Date(intoMilli + day)
        return departureDate
    };

    const updateOrigin = (event) => setOrigin(event.target.value);
    const updateDestination = (event) => setDestination(event.target.value);
    const updateStart = (event) => setStart(event.target.value);
    const updateReturn = (event) => setTripReturn(event.target.value);
    const updatePrice = (event) => setPrice(event.target.value);


    const submitWatchlistForm = async (event) => {
        event.preventDefault();

        if (price === '') {
            setPrice(null)
        };

        const payload = {
            'origin': origin,
            'destination': destination,
            'price': price,
            'start': start,
            'tripReturn': tripReturn,
            'userId': userId,
        };
        await dispatch(createOneWatchlist(payload));
        window.location.reload();
    };

    return (
        <div className='watchlistsDiv'>
            <h3>Watchlists
                <button className='watchlistsShowP'>?</button>
            </h3>
            {/* <ModalWatchlistQuestion openModal={openModal} closeModal={closeModal}/> */}
            <div className='watchlistsFormDiv'>
                <form className='watchlistsForm' onSubmit={submitWatchlistForm}>
                    <div>
                        <label>Origin Airport</label>
                        <input
                            type='text'
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
                            type='text'
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
                            type='text'
                            placeholder='Price'
                            name='price'
                            value={price}
                            onChange={updatePrice}
                        ></input>
                    </div>
                    <div>
                        <label>Departure Date</label>
                        <input
                            type='date'
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
                            type='date'
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
        </div>
    )
}

export default WatchlistForm;
