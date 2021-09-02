import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAllFlights } from '../../store/home';
import { createOneBooking } from '../../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import FlightSearchResults from './FlightSearchResults';
import './styles/flightSearchForm.css'





function FlightSearchForm({origin, setOrigin, destination, setDestination, setLoading}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    // const [origin, setOrigin] = useState('');
    // const [destination, setDestination] = useState('');
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState('');
    const [errors, setErrors] = useState(false)


    function formDate(date) {
        const intoMilli = Date.parse(date)
        const day = 60 * 60 * 24 * 1000;
        const departureDate = new Date(intoMilli + day)
        return departureDate
    }

    const updateOrigin = (event) => {
        const value = (event.target.value).toUpperCase()
        setOrigin(value)
    }

    const updateDestination = (event) => setDestination((event.target.value).toUpperCase())

    const updateStart = (event) => {
        setStart(event.target.value)
        formDate(event.target.value)
        const today = new Date()

        if(formDate(event.target.value) < today) {
            setErrors('Invalid departure date. Please select a departure date in the future.')
        } else {
            setErrors(false)
        }
    }

    const updateEnd = (event) => {
        setEnd(event.target.value)
        const returnDate = formDate(event.target.value)

        if(returnDate < formDate(start)) {
            setErrors('Invalid return date. Please select a return date greater than the departure date.')
        } else {
            setErrors(false)
        }
    }


    const searchFlights = async(event) => {
        event.preventDefault();
        setLoading(true)

        if (user) {
            const payload = {
                userId: user.id,
                origin,
                destination,
                start,
                end
            }
            await dispatch(searchAllFlights(payload))
            setLoading(false)
        } else {
            const payload = {
                userId: false,
                origin,
                destination,
                start,
                end
            }
            await dispatch(createOneBooking(payload))
        }
    }


    return (
        <div className='form_wrapper'>
            <h3>Search Flights</h3>
            <div className='searchForm-errors'>{errors ? errors : ''}</div>
            <form onSubmit={searchFlights} className='searchForm' id='formValidation'>
                <div className='searchInputDiv_Origin'>
                    <div id = 'errorElement'>{}</div>
                    <label>Origin Airport</label>
                    <input
                        id = 'originInput'
                        type='text'
                        placeholder='Leaving from (ex: MIA)'
                        name='origin'
                        value={origin}
                        required
                        onChange={updateOrigin}
                    ></input>
                </div>
                <div className='searchInputDiv_Departure'>
                    <label>Departure Date</label>
                    <input
                        id = 'departureInput'
                        type='date'
                        name='departure'
                        value={start}
                        onChange={updateStart}
                    ></input>
                </div>
                <div className='searchInputDiv_Destination'>
                    <label>Destination Airport</label>
                    <input
                        id = 'destinationInput'
                        type='text'
                        placeholder='Going to (ex: JFK)'
                        name='destination'
                        value={destination}
                        required
                        onChange={updateDestination}
                    ></input>
                </div>
                <div className='searchInputDiv_Return'>
                    <label>Return Date</label>
                    {start ?
                    <input
                        id = 'returnInput'
                        type='date'
                        name='return'
                        value={end}
                        onChange={updateEnd}
                    ></input>
                    : <input
                        id = 'returnInput'
                        type='date'
                        name='return'
                        disabled
                    ></input>
                    }
                </div>
                {errors ? <button disabled/> :
                    <button className='searchFormButton'>Search Flights</button>
                }
            </form>
            {/* <div className='flightFilters'>
                <select>
                </select>
            </div> */}
        </div>
    )

}

export default FlightSearchForm;
