import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Home() {
    const { userId }  = useParams();

    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const updateSearch = (event) => setSearch(event.target.value)
    const updateStart = (event) => setEnd(event.target.value)
    const updateEnd = (event) => setEnd(event.target.value)
    console.log(start, end, '=============')


    const searchFlights = () => {
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
                        <input
                            type='text'
                            placeholder='Going to'
                            name='destination'
                            value={search}
                            required
                            onChange={updateSearch}
                        ></input>
                        <input
                            type='date'
                            onChange={updateStart}
                        ></input>
                        <input
                            type='date'
                            onChange={updateEnd}
                        ></input>
                    </div>
                    <button>Search Flights</button>
                </form>
            </div>
        </div>
    )
}

export default Home;
