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
    const updatePrice = (event) => setPrice(event.target.value);
    const updateStart = (event) => {
        setStart(event.target.value);
        const departureDate = formDate(event.target.value)
        const today = new Date()

        if(departureDate < today) {
            setErrors('Invalid departure date. Please select a departure date in the future.')
        } else {
            setErrors(false)
        }
    }
    const updateReturn = (event) => {
        setTripReturn(event.target.value);
        const returnDate = formDate(event.target.value)

        if(returnDate < formDate(start)) {
            setErrors('Invalid return date. Please select a return date greater than the departure date.')
            console.log(errors)
        } else {
            setErrors(false)
        }
    }


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
                    {errors ?
                        <div>{errors}</div>
                    :
                    <div></div>
                    }
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
                        {start ?
                        <input
                            type='date'
                            placeholder='Return Date'
                            name='tripReturn'
                            value={tripReturn}
                            required
                            onChange={updateReturn}
                        ></input>
                        :
                        <input
                            type='date'
                            placeholder='Return Date'
                            name='tripReturn'
                            disabled
                        ></input>
                        }
                    </div>
                    {errors ?
                    <button type='submit' disabled>Create Watchlist</button>
                    :
                    <button type='submit'>Create Watchlist</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default WatchlistForm;
