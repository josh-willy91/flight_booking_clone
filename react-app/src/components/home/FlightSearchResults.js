import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { searchAllFlights } from '../../store/home';
import { createOneBooking } from '../../store/dashboard';
import formatISO from 'date-fns/formatISO'
import format from 'date-fns/formatISO'
import '../../styles/home.css'





function FlightSearchResults({ flight, origin, destination }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)


    const noUserRedirect = () => {
        history.push('/login')
    }

    const getLastIATA = (array) => {
        const nested = array.itineraries[0].segments
        const length = nested.length - 1;
        return nested[length].arrival.iataCode
    }

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
        const nested = array.itineraries[itenaryLength].segments
        const length = nested.length - 1;
        return nested[length].departure.at
    }

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
    }

    const bookFlightButton = () => {
        let airline = flight?.validatingAirlineCodes[0]
        let start = format(flight?.itineraries[0].segments[0].arrival.at)
        let end = format(flight?.itineraries[0].segments[0].departure.at)
        let flightNum = flight?.validatingAirlineCodes + flight?.itineraries[0].segments[0].number
        let price = flight?.price.total
        let tripReturn = format(getLastDeparture(flight))
        bookFlight(airline, start, end, flightNum, price, tripReturn)
    }

    return (
        <li key={flight.id} className='searchResultsLi'>
            <div className='searchResultsRoute'>
                {flight.oneWay === true ?
                    <p className='searchResultsRoute'>{flight.itineraries[0].segments[0].departure.iataCode} to
                        {flight.itineraries[0].segments[0].arrival.iataCode}</p> :
                    <p className='searchResultsRoute'>{flight.itineraries[0].segments[0].departure.iataCode} to
                        {getLastIATA(flight)}</p>
                }
            </div>
            {flight.oneWay === true ?
                <div className='searchResultsLiDiv'>One Way:
                    <p className='searchResultsLiP'>Yes</p>
                </div> :
                <div className='searchResultsLiDiv'>Stops:
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
                <button className='searchResultsButton' onClick={bookFlightButton}
                >Book Flight</button> :
                <button className='searchResultsButton' onClick={noUserRedirect}>Login to Book</button>
            }
        </li>
    )
}

export default FlightSearchResults;
