import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchAllFlights } from '../store/home';
import { createOneBooking } from '../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import { areIntervalsOverlapping } from 'date-fns';
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

    const updateOrigin = (event) => setOrigin(event.target.value)
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
                <form onSubmit={searchFlights} className='searchForm'>
                    <div className='searchInputDivOrigin'>
                        <label>Origin Airport</label>
                        <input
                            type='text'
                            placeholder='Leaving from'
                            name='origin'
                            value={origin}
                            required
                            onChange={updateOrigin}
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
                                <button className='searchResultsButton' onClick={() => {
                                    setAirline(flight.validatingAirlineCodes[0])
                                    setStart(format(flight.itineraries[0].segments[0].arrival.at))
                                    setEnd(format(flight.itineraries[0].segments[0].departure.at))
                                    setFlightNum((flight.validatingAirlineCodes + flight.itineraries[0].segments[0].number))
                                    setPrice(flight.price.total)
                                    setTripReturn(format(getLastDeparture(flight)))
                                    bookFlight()
                                }}
                                >Book Flight</button>
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
