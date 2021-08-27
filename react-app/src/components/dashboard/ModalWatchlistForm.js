import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editOneWatchlist } from '../../store/dashboard';
import ReactDOM from 'react-dom';
import './styles/modalWatchlistForm.css'


function ModalWatchlistForm({ origin, setOrigin, destination, setDestination,
    price, setPrice, start, setStart, tripReturn, setTripReturn, watchlistId,
    openModal, closeModal, children}) {
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
            'watchlistId': watchlistId,
            'origin': origin,
            'destination': destination,
            'price': price,
            'start': start,
            'tripReturn': tripReturn,
            'userId': userId
        }
        console.log(payload, '==================')
        await dispatch(editOneWatchlist(payload))
        window.location.reload();
    }

    if(!openModal) {
        return null;
    }

    // ReactDOM.createPortal
    return(
        <div className='modal_wrapper'>
            <div className='modal_background' onClick={closeModal}/>
            <div className='modal_content'>
                <div className='x_button_div'>
                    <button onClick={closeModal}>X</button>
                </div>
                <form className='modalWatchlistsForm' onSubmit={submitWatchlistForm}>
                    <h3>Edit Your Watchlist</h3>
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
                    <button className='modalFormSubmit' type='submit'>Submit Edits to Watchlist</button>
                </form>
            </div>
        </div>
        // ,
        // document.getElementById('portal')
    )
}

export default ModalWatchlistForm;
