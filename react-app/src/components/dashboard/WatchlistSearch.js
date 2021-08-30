import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOneWatchlist } from '../../store/dashboard'



function WatchlistSearch({setOpenModal, setWatchlistId, deleteWatchlist}) {

    const watchlists = useSelector((state) => state.dashboardReducer.watchlists)

    const getLastDeparture = (array) => {
        const nested = array.itineraries[0].segments
        const length = nested.length - 1;
        return nested[length].departure.at
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


    return (
        <div className='watchlistsSearchDiv'>
            <ul className='watchlistsSearchUl'>
                {watchlists && watchlists.watchlist_list.map((details) => (
                    <li className='watchlistsSearchLi' key={details.id}>
                        <div className='searchCriteriaDiv'>
                            <h3>Watchlist Search Criteria</h3>
                            <div>Leaving from {details.origin}</div>
                            <div>Departure Date: {details.depart_date}</div>
                            <div>Destination: {details.destination}</div>
                            <div>Return flight leaves: {details.trip_return}</div>
                            <div>Price: {details.price ? `Less than $${details.price}` : 'No limit set'}</div>
                            <div>
                                <button onClick={() => deleteWatchlist(details.id)}>Delete Watchlist</button>
                                <button onClick={() => {
                                    setOpenModal(true)
                                    setWatchlistId(details.id)
                                }
                                }> Edit Watchlist</button>
                            </div>
                        </div>
                        <div className='carousel'>
                            {watchlists.watchlist_data_obj[`${details.id}`].map((flight) => (
                                <li className='carousel_item' key={flight.id}>
                                    {!flight ? <div className='errors'>Your watchlist departure date as occured.  Please edit the watchlist and update the date or delete.</div>
                                    :
                                    <div>
                                        <div>
                                            {flight.oneWay === true ?
                                                <p>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</p> :
                                                <p>Flight Route {flight.itineraries[0].segments[0].departure.iataCode} to {getLastIATA(flight)}</p>
                                            }
                                        </div>
                                        <div>
                                            {flight.oneWay === true ?
                                                <p>One Way: Yes</p> :
                                                <p>Layovers: {flight.itineraries[0].segments.length - 1}</p>
                                            }
                                        </div>
                                        <div>
                                            <p>Departs: {format(flight.itineraries[0].segments[0].departure.at)}</p>
                                        </div>
                                        <div>
                                            <p>Arrival: {format(flight.itineraries[0].segments[0].arrival.at)}</p>
                                        </div>
                                        <div>
                                            <p>Return Flight: {format(getLastDeparture(flight))}</p>
                                        </div>
                                        <div>
                                            <p>Price: ${flight.price.total}</p>
                                        </div>
                                        <div>
                                            <p>Airline Code: {flight.validatingAirlineCodes[0]}</p>
                                        </div>
                                        <div>
                                            <p>Flight Number: {flight.validatingAirlineCodes[0]}{flight.itineraries[0].segments[0].number}</p>
                                        </div>
                                    </div>
                                    }
                                </li>
                            ))}
                        </div>
                        {/* <div className='carousel_actions'>
                            <button id='carousel_Button--Prev' aria-label='previous slide'>Previous Slide</button>
                            <button id='carousel_Button--Next' aria-label='next slide'>Next Slide</button>
                        </div> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WatchlistSearch;
