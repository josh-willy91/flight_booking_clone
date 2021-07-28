import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Home() {
    const { userId }  = useParams();

    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');

    const updateSearch = (event) => setSearch(event.target.value)
    // console.log(search, '=============')


    const searchFlights = (event) => {
    }

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
                        <div class='jqueryCalander'></div>
                        <input
                            className = 'jqueryCalander'
                            type='text'
                            id='calander'
                        ></input>
                    </div>
                    <button >Search Flights</button>
                </form>
            </div>
        </div>
    )
}

export default Home;
