import React, { useState, useEffect } from 'react';
import { watchlistDetails, deleteOneWatchlist, createOneWatchlist, editOneWatchlist } from '../store/dashboard';
import { bookingDetails, deleteOneBooking, createOneBooking } from '../store/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/dashboard.css'


function WatchlistForm({ origin, setOrigin, destination, setDestination,
    price, setPrice, start, setStart, tripReturn, setTripReturn }) {

    const dispatch = useDispatch()
    const { userId } = useParams();

    const updateOrigin = (event) => setOrigin(event.target.value)
    const updateDestination = (event) => setDestination(event.target.value)
    const updateStart = (event) => setStart(event.target.value)
    const updateReturn = (event) => setTripReturn(event.target.value)
    const updatePrice = (event) => setPrice(event.target.value)


    const submitWatchlistForm = async (event) => {
        event.preventDefault()

        if (price === '') {
            setPrice(null)
        }

        const payload = {
            'origin': origin,
            'destination': destination,
            'price': price,
            'start': start,
            'tripReturn': tripReturn,
            'userId': userId
        }
        console.log(payload, '==================')
        await dispatch(createOneWatchlist(payload))
        window.location.reload();
    }

    return (
        <div className='watchlistsDiv'>
            <h3>Watchlists</h3>
            <button className='watchlistsShowP'>?</button>
            <p className='watchlistsP'>What is a watchlist?... It's a convinient way to track flights you may be interested in.
                Simply create a watchlist for a destination you'd like to go to.
                Search filters, such as price, will only show flights that meet all criteria.</p>
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
