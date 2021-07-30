import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchAllFlights } from '../store/home';


function Home() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const searchResults = useSelector((state) => state.searchAllFlights.flights)

    // const [user, setUser] = useState({});
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

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
            dispatch(searchAllFlights(payload))
        }
    }

    const bookFlight = (event) => {

    }

    // <input type="date" id="start" name="trip-start"
    //    value="2018-07-22"
    //    min="2018-01-01" max="2018-12-31"></input>

    return (
        <div>
            <div>
                Home page
            </div>
            <div>
                <h3>Search</h3>
                <form onSubmit={searchFlights}>
                    <div>
                        <div>
                            <input
                                type='text'
                                placeholder='Leaving from'
                                name='origin'
                                value={origin}
                                required
                                onChange={updateOrigin}
                            ></input>
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Going to'
                                name='destination'
                                value={destination}
                                required
                                onChange={updateDestination}
                            ></input>
                        </div>
                        <div>
                            <label>Departure Date</label>
                            <input
                                type='date'
                                name='departure'
                                value={start}
                                onChange={updateStart}
                            ></input>
                        </div>
                        <div>
                            <label>Return Date</label>
                            <input
                                type='date'
                                name='return'
                                value={end}
                                onChange={updateEnd}
                            ></input>
                        </div>
                        <button>Search Flights</button>
                    </div>
                </form>
            </div>
            <div>
                {searchResults ?
                <div>
                    <ul>
                        {searchResults.flight.map((flight) => (
                            <li key={flight.id}>
                                <div>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[1].arrival.iataCode}</div>
                                <div>Departs: {flight.itineraries[0].segments[0].departure.at}</div>
                                <div>Arrival: {flight.itineraries[0].segments[1].arrival.at}</div>
                                <div>Price: ${flight.price.total}</div>
                                <div>Airline Code {flight.validatingAirlineCodes}</div>
                                <button onClick={bookFlight}>Book Flight</button>
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
