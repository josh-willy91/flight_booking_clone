import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAllFlights } from '../store/home';
import { createOneBooking } from '../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import FlightSearchResults from './FlightSearchResults';
import '../styles/home.css'



function FlightSearchForm({origin, setOrigin, destination, setDestination}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    // const [origin, setOrigin] = useState('');
    // const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    // const form = document.getElementById('formValidation')
    // const originInput = document.getElementById('originInput')
    // const departureInput = document.getElementById('departureInput')
    // const destinationInput = document.getElementById('destinationInput')
    // const returnInput = document.getElementById('returnInput')
    // const errorElement = document.getElementById('errorElement')

    // form.addEventListener('submit', (event) => {
    //     event.preventDefault()
    //     let messages = []

    //     if(messages.length > 0) {
    //         event.preventDefault()

    //     }
    // })


    const updateOrigin = (event) => {
        const value = (event.target.value).toUpperCase()
        console.log(value, 'vale========================')
        // const format = value.toUppercase()
        // console.log(value, '======31=========')
        setOrigin(value)
        // console.log(origin, '=======33========')
    }
    const updateDestination = (event) => setDestination((event.target.value).toUpperCase())
    const updateStart = (event) => setStart(event.target.value)
    //     setStart(event.target.value)
    //     let today = new Date()
    //     // let dateFormat = format(today, 'yyyy')
    //     console.log(start, today, '========start 51=================')
    //     if(start > today) {
    //         console.log('conditional works')
    //     }
    // }
        const updateEnd = (event) => setEnd(event.target.value)


    const searchFlights = async(event) => {
        event.preventDefault();
        if (user) {
            const payload = {
                userId: user.id,
                origin,
                destination,
                start,
                end
            }
            console.log(payload, '==========payload============')
            await dispatch(searchAllFlights(payload))
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
            <form onSubmit={searchFlights} className='searchForm' id='formValidation'>
                <div className='searchInputDivOrigin'>
                    <div id = 'errorElement'>{}</div>
                    <label>Origin Airport</label>
                    <input
                        id = 'originInput'
                        type='text'
                        placeholder='Airport leaving from ex: MIA'
                        name='origin'
                        value={origin}
                        required
                        onChange={updateOrigin}
                    ></input>
                </div>
                <div className='searchInputDivOrigin'>
                    <label>Departure Date</label>
                    <input
                        id = 'departureInput'
                        type='date'
                        name='departure'
                        value={start}
                        onChange={updateStart}
                    ></input>
                </div>
                <div className='searchInputDivDestination'>
                    <label>Destination Airport</label>
                    <input
                        id = 'destinationInput'
                        type='text'
                        placeholder='Airport going to ex: JFK'
                        name='destination'
                        value={destination}
                        required
                        onChange={updateDestination}
                    ></input>
                </div>
                <div className='searchInputDivDestination'>
                    <label>Return Date</label>
                    <input
                        id = 'returnInput'
                        type='date'
                        name='return'
                        value={end}
                        onChange={updateEnd}
                    ></input>
                </div>
                <button className='searchFormButton'>Search Flights</button>
            </form>
        </div>
    )

}

export default FlightSearchForm;
