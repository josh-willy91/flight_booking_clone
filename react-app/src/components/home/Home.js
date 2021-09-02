import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAllFlights } from '../../store/home';
import { createOneBooking } from '../../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import FlightSearchResults from './FlightSearchResults';
import FlightSearchForm from './FlightSearchForm';
import searchBackground from '../../images/searchBackground.jpg'
import './styles/home.css';
import '../styles/loading.css';


function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const searchResults = useSelector((state) => state.searchAllFlights.flights)

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    //test loading animation
    const [loading, setLoading] = useState(false)
    console.log(loading)


    return (
        <div className='homeDiv'>
            <img src={searchBackground} alt="" className="searchBackground" />
            <div className='searchDiv'>
                <FlightSearchForm origin={origin} setOrigin={setOrigin}
                    destination={destination} setDestination={setDestination}
                    start={start} end={end} setStart={setStart} setEnd={setEnd}
                    setLoading={setLoading}/>
            </div>
            <div className='searchResultsDiv'>
                {searchResults && searchResults.errors ?
                    <div>
                        <h3 className='errors-h'>{searchResults.errors}</h3>
                        <p className='errors-p'>Your search failed. Make sure the airport codes
                            you are using are correct.  An example would be MIA for
                            Miami International Airport. Please also verify the dates.
                        </p>
                    </div>
                    :
                    <div>
                        {loading ?
                            <section className='loading-wrapper'>
                                <div className='loading'>
                                    <span className='p1'></span>
                                    <span className='p2'></span>
                                    <span className='p3'></span>
                                    <span className='p4'></span>
                                    <span className='p5'></span>
                                    <span className='p6'></span>
                                    <span className='p7'></span>
                                    <span className='p8'></span>
                                    <span className='p9'></span>
                                    <span className='p10'></span>
                                    <span className='p11'></span>
                                    <span className='p12'></span>
                                    <span className='p13'></span>
                                    <span className='p14'></span>
                                    <span className='p15'></span>
                                    <span className='p16'></span>
                                    <span className='p17'></span>
                                    <span className='p18'></span>
                                    <span className='p19'></span>
                                    <span className='p20'></span>
                                </div>
                            </section>
                            :
                            <div className='searchResults-h3'>Search Results</div>
                        }
                        {/* <h3 className='searchResults-h3'>Search Results</h3> */}
                        <ul className='searchResultsUl'>
                            {searchResults && searchResults.flight.map((flightDetails) => (
                                <FlightSearchResults flight={flightDetails} origin={origin} destination={destination}/>
                                // flight, origin, destination, start, end
                                ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;
