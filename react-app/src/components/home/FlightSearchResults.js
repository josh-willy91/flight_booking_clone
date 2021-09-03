import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { searchAllFlights } from '../../store/home';
import { createOneBooking } from '../../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import './styles/flightSearchResults.css'


function FlightSearchResults({ flight, origin, destination }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    const [expand, setExpand] = useState(false);
    console.log(expand, '====expand line 17========')

    const toggle = () => {
        if(expand) {
            setExpand(false)
            console.log(expand, 'if then false')
        } else {
            setExpand(true)
            console.log(expand, 'else')
        };
    };


    const noUserRedirect = () => {
        history.push('/login')
    }

    const getLastIATA = (array) => {
        const nested = array.itineraries[0].segments
        const length = nested.length - 1;
        return nested[length].arrival.iataCode
    };

    // formatISO(date, [options]) syntax for function
    // formats the data string returned from query
    // ('+020201-06-26T00:00:00.000Z')
    const format = function (dateString) {
        const spitTime = dateString.split('T').join(' ')
        // const result = format(spitTime, 'eeee do MMMM')
        return spitTime;
    };
    // 2021-08-01T08:38:00

    // <input type="date" id="start" name="trip-start"
    //    value="2018-07-22"
    //    min="2018-01-01" max="2018-12-31"></input>

    const getLastDeparture = (array) => {
        const itenaryLength = array.itineraries.length - 1
        const nested = array.itineraries[itenaryLength].segments[0]
        // const length = nested.length - 1;
        return nested.departure.at
    };

    const bookFlight = async (airline, start, end, flightNum, price, tripReturn) => {
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
        await dispatch(createOneBooking(payload))
        history.push(`/users/${user.id}`)
    };

    const bookFlightButton = () => {
        let airline = flight?.validatingAirlineCodes[0]
        let start = format(flight?.itineraries[0].segments[0].arrival.at)
        let end = format(flight?.itineraries[0].segments[0].departure.at)
        let flightNum = flight?.validatingAirlineCodes + flight?.itineraries[0].segments[0].number
        let price = flight?.price.total
        let tripReturn = format(getLastDeparture(flight))
        bookFlight(airline, start, end, flightNum, price, tripReturn)
    };

    let noDuplicateFlightNums = {};

    function noDuplicateFlights(array) {
        const IATA = array.validatingAirlineCodes[0]
        const planeNum = array.itineraries[0].segments[0].number
        const flightNum = IATA + planeNum
        console.log(flightNum)
        console.log(noDuplicateFlightNums)

        if(noDuplicateFlightNums[flightNum]) {
            return true
        } else {
            noDuplicateFlightNums[flightNum] = 'true'
            return false
        }
    };


    if(flight.errors) {
        return (
            <div>{flight.errors}</div>
        )
    } else if(typeof(flight[0]) === 'string' || flight[0] instanceof String) {
        return (
            <p className='noMatch'>{flight}</p>
        )
    } else {
        return (
            <li key={flight.id} className={`searchResultsLi ${expand ? 'expand' : 'collapse'} `}>
            {/* {noDuplicateFlights(flight) === true ? null : null} */}
                <div className='result-wrapper'>
                    <div className='route'>
                        {flight.oneWay === true ?
                            <div className='route-p'>{flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</div> :
                            <div className='route-p'>{flight.itineraries[0].segments[0].departure.iataCode} to {getLastIATA(flight)}</div>
                        }
                    </div>
                    <div className='stops-container'>
                    {flight.oneWay === true ?
                        <div className='oneWay'>One Way:
                            <p className='results-p'>Yes</p>
                        </div> :
                        <div className='stops'>Stops:
                        <p className='results-p'>{flight.itineraries[0].segments.length - 1}</p>
                        </div>
                    }
                    </div>
                    <div className='departs'> Departs:
                        <p className='results-p'>{format(flight.itineraries[0].segments[0].departure.at)}</p>
                    </div>
                    <div className='arrival'>Arrival:
                        <p className='results-p'>{format(flight.itineraries[0].segments[0].arrival.at)}</p>
                    </div>
                    <div className='return'>Return Flight:
                        <p className='results-p'>{format(getLastDeparture(flight))}</p>
                    </div>
                    <div className='price'>Price:
                        <p className='results-p'>${flight.price.total}</p>
                    </div>
                    <div className='code'>Airline:
                        <p className='results-p'>{flight.validatingAirlineCodes[0]}</p>
                    </div>
                    <div className='flightNumber'>Flight Number:
                        <p className='results-p'>{flight.validatingAirlineCodes[0]}{flight.itineraries[0].segments[0].number}</p>
                    </div>
                    <div className='details-container'>
                        <div className={`details-button ${expand ? 'up-arrow' : 'down-arrow'}`} onClick={() => toggle()}></div>
                    </div>
                    <div className='bookFlight-container'>
                    {user ?
                        <button className='searchResultsButton' onClick={bookFlightButton}
                        >Book Flight</button> :
                        <button className='searchResultsButton' onClick={noUserRedirect}>Login to Book</button>
                    }
                    </div>


                    {/* {<div className='hidden' id='hidden'>
                        <p>A bunch more information about the flight</p>
                        <button>Close</button>
                    </div>} */}
                </div>
            </li>
        )
    };
};

export default FlightSearchResults;
