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
    // const [start, setStart] = useState('');
    // const [end, setEnd] = useState('');

    // useEffect(() => {

    //     if(origin) {
    //         const upperCase = origin.toUpperCase()
    //         setOrigin()

    //         // if(origin.includes(/#/)) {
    //         //     console.log('error error error')
    //         // }
    //     }

    // }, [origin])




    return (
        <div className='homeDiv'>
            {/* <img src="images/searchBackground.jpg" alt="" className="searchBackground" /> */}
            <div className='searchDiv'>
                <h3>Search Flights</h3>
                <FlightSearchForm origin={origin} setOrigin={setOrigin}
                    destination={destination} setDestination={setDestination}/>
            </div>
            <div className='searchResultsDiv'>
                {searchResults ?
                    <div>
                        <h3>Search Results</h3>
                        <ul>
                            {searchResults && searchResults.flight.map((flightDetails) => (
                                <FlightSearchResults flight={flightDetails} origin={origin} destination={destination}/>
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
