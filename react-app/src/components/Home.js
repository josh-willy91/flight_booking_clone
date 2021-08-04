import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAllFlights } from '../store/home';
import { createOneBooking } from '../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import FlightSearchResults from './FlightSearchResults';
import FlightSearchForm from './FlightSearchForm';
import '../styles/home.css'


function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const searchResults = useSelector((state) => state.searchAllFlights.flights)

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    const updateOrigin = (event) => {
        const value = event.target.value
        // const format = value.toUppercase()
        console.log(value, '======31=========')
        setOrigin(value)
        console.log(origin, '=======33========')
    }
    const updateDestination = (event) => setDestination(event.target.value)
    const updateStart = (event) => setStart(event.target.value)
    const updateEnd = (event) => setEnd(event.target.value)


    const searchFlights = (event) => {
        event.preventDefault();
        if (user) {
            const payload = {
                userId: user.id,
                origin,
                destination,
                start,
                end
            }
            dispatch(searchAllFlights(payload))
        } else {
            const payload = {
                userId: false,
                origin,
                destination,
                start,
                end
            }
            dispatch(createOneBooking(payload))
        }
    }


    return (
        <div className='homeDiv'>
            <img src="images/searchBackground.jpg" alt="" className="searchBackground" />
            <div className='searchDiv'>
                <h3>Search Flights</h3>
                <FlightSearchForm/>
            </div>
            <div className='searchResultsDiv'>
                {searchResults ?
                    <div>
                        <h3>Search Results</h3>
                        <ul>
                            {searchResults && searchResults.flight.map((flightDetails) => (
                                <FlightSearchResults flight={flightDetails} origin={origin} destination={destination}
                                    start={start} end={end}/>
                                // flight, origin, destination, start, end
                            ))}
                        </ul>
                    </div>
                    :
                    <h3>Results pending search</h3>
                }
            </div>
        </div>
    )
}

export default Home;
