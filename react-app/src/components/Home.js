import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { searchAllFlights } from '../store/home';
import { createOneBooking } from '../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import { areIntervalsOverlapping } from 'date-fns';

import Amadeus from 'amadeus';
import '../styles/home.css'


function Home() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const searchResults = useSelector((state) => state.searchAllFlights.flights)

    // const [user, setUser] = useState({});
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState(0);
    const [flightNum, setFlightNum] = useState('');
    const [airline, setAirline] = useState('');
    const [tripReturn, setTripReturn] = useState('');

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
        if(user) {
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

    const fetchFlights = async(event) => {
        event.preventDefault()

        const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JAX&destinationLocationCode=MCO&departureDate=2021-08-12&adults=1&nonStop=false&max=5`)
        console.log(response, '========response=====================')

        if(response.ok) {
            const result = response.json()
            console.log(result, '===========result=============')
        }


        // const amadeus = new Amadeus({
        //     clientId: process.env.API_PUBLIC_KEY,
        //     clientSecret: process.env.API_SECRET_KEY
        //     // client_id=os.environ.get('API_PUBLIC_KEY'),
        //     // client_secret=os.environ.get('API_SECRET_KEY')
        // });

        // amadeus.shopping.flightOffersSearch.get({
        //     originLocationCode: 'JAX',
        //     destinationLocationCode: 'MCO',
        //     departureDate: '2021-12-12',
        //     adults: '1',
        //     max: 5,
        // }).then(function(response){
        //     console.log(response.data);
        // }).catch(function(responseError){
        //     console.log(responseError.code);
        // });
    }

    const bookFlight = (event) => {
        const payload = {
            'userId': user.id,
            'cityFrom': origin,
            'cityTo': destination,
            'price': price,
            'flightNum': flightNum,
            'airline': airline,
            'departDate': start,
            'arrivalDate': end,
            'tripReturn': tripReturn,
        }
        dispatch(createOneBooking(payload))
        //history.push
    }

    const noUserRedirect = () => {
        return <Redirect to='/login'/>
    }

    const getLastIATA = (array) => {
        const nested = array.itineraries[0].segments
        const length = nested.length - 1;
        return nested[length].arrival.iataCode
    }

    const getLastDeparture = (array) => {
        const nested = array.itineraries[0].segments
        const length = nested.length - 1;
        return nested[length].departure.at
    }


        // formatISO(date, [options]) syntax for function
    // formats the data string returned from query
    // ('+020201-06-26T00:00:00.000Z')
    const format = function(dateString) {
        const spitTime = dateString.split('T').join(' ')
        // const result = format(spitTime, 'eeee do MMMM')
        return spitTime;
    };
    // 2021-08-01T08:38:00

    // <input type="date" id="start" name="trip-start"
    //    value="2018-07-22"
    //    min="2018-01-01" max="2018-12-31"></input>

    return (
        <div className='homeDiv'>
            <img src="images/searchBackground.jpg" alt="" className="searchBackground"/>
            <div className='searchDiv'>
                <h3>Search Flights</h3>
                <form onSubmit={fetchFlights} className='searchForm'>
                    <div className='searchInputDivOrigin'>
                        <label>Origin Airport</label>
                        <input
                            type='text'
                            placeholder='Leaving from'
                            name='origin'
                            value={origin}
                            required
                            onChange={(e) => setOrigin(e.target.value)}
                        ></input>
                    </div>
                    <div className='searchInputDivOrigin'>
                        <label>Departure Date</label>
                        <input
                            type='date'
                            name='departure'
                            value={start}
                            onChange={updateStart}
                        ></input>
                    </div>
                    <div className='searchInputDivDestination'>
                        <label>Destination Airport</label>
                        <input
                            type='text'
                            placeholder='Going to'
                            name='destination'
                            value={destination}
                            required
                            onChange={updateDestination}
                        ></input>
                    </div>
                    <div className='searchInputDivDestination'>
                        <label>Return Date</label>
                        <input
                            type='date'
                            name='return'
                            value={end}
                            onChange={updateEnd}
                        ></input>
                    </div>
                    <button className='searchFormButton'>Search Flights</button>
                </form>
            </div>
            <div className='searchResultsDiv'>
                {searchResults ?
                <div>
                    <h3>Search Results</h3>
                    <ul>
                        {searchResults && searchResults.flight.map((flight) => (
                            <li key={flight.id} className='searchResultsLi'>
                                <div className='searchResultsRoute'>
                                    {flight.oneWay === true ?
                                    <p className='searchResultsRoute'>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</p> :
                                    <p className='searchResultsRoute'>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {getLastIATA(flight)}</p>
                                    }
                                </div>
                                {flight.oneWay === true ?
                                <div className='searchResultsLiDiv'>One Way:
                                    <p className='searchResultsLiP'>Yes</p>
                                </div> :
                                <div className='searchResultsLiDiv'>Layovers:
                                    <p className='searchResultsLiP'>{flight.itineraries[0].segments.length - 1}</p>
                                </div>
                                }
                                <div className='searchResultsLiDiv'> Departs:
                                    <p className='searchResultsLiP'>{format(flight.itineraries[0].segments[0].departure.at)}</p>
                                </div>
                                <div className='searchResultsLiDiv'>Arrival:
                                    <p className='searchResultsLiP'>{format(flight.itineraries[0].segments[0].arrival.at)}</p>
                                </div>
                                <div className='searchResultsLiDiv'>Return Flight:
                                    <p className='searchResultsLiP'>{format(getLastDeparture(flight))}</p>
                                </div>
                                <div className='searchResultsLiDiv'>Price:
                                    <p className='searchResultsLiP'>${flight.price.total}</p>
                                </div>
                                <div className='searchResultsLiDiv'>Airline Code:
                                    <p className='searchResultsLiP'>{flight.validatingAirlineCodes[0]}</p>
                                </div>
                                <div className='searchResultsLiDiv'>Flight Number:
                                    <p className='searchResultsLiP'>{flight.validatingAirlineCodes[0]}{flight.itineraries[0].segments[0].number}</p>
                                </div>
                                {user ?
                                    <button className='searchResultsButton' onClick={ async() => {
                                        await setAirline(flight.validatingAirlineCodes[0])
                                        await setStart(format(flight.itineraries[0].segments[0].arrival.at))
                                        await setEnd(format(flight.itineraries[0].segments[0].departure.at))
                                        await setFlightNum((flight.validatingAirlineCodes + flight.itineraries[0].segments[0].number))
                                        await setPrice(flight.price.total)
                                        await setTripReturn(format(getLastDeparture(flight)))
                                        await bookFlight()
                                    }}
                                    >Book Flight</button> :
                                    <button className='searchResultsButton'>Login to Book</button>
                                }
                            </li>
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
