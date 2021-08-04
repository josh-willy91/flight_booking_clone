import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/landing.css'

function Landing() {
    const [user, setUser] = useState({});
    const { userId }  = useParams();

    const signupClick = () => {
        window.location = '/sign-up'
    }

    const loginClick = () => {
        window.location = '/login'
    }

    return (
        <div className='landingDiv'>
            <div className='landingContent'>
                <h3>Welcome to BookYeah!</h3>
                <p>We make finding flights easier for you
                    so you don't have to worry with the
                    hastle of searching for the best price
                    or losing your flight booking information.
                </p>
                <p>
                    What are you waiting for??? Exotic places
                    and amzing adventures await you ahead!
                    signup or login and start booking flights.
                </p>
                <div className='buttonDiv'>
                    <button onClick={signupClick}>Signup</button>
                    <button onClick={loginClick}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Landing;
