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
        <div className='landing-wrapper'>
            <div className='landingContent'>
                <h3>Welcome to BookYeah!</h3>
                <p className='landing-p'><strong>We make finding flights easier </strong>
                    so you don't have to worry with the
                    hastle of searching for the best price
                    or losing your flight booking information.
                </p>
                <p className='landing-p'>
                    What are you waiting for??? <strong>Exotic places </strong>
                    and <strong>amzing adventures </strong>await you ahead!
                    signup or login and start booking flights.
                </p>
                <div className='buttonDiv'>
                    <button onClick={signupClick}>Signup</button>
                    <button onClick={loginClick}>Login</button>
                </div>
            </div>
            <img className='img-1' src='images/landing-1.jpg'></img>
            <img className='img-2' src='images/landing-2.jpg'></img>
            <img className='img-3' src='images/landing-3.jpg'></img>
            <img className='img-4' src='images/landing-4.jpg'></img>
            <img className='img-5' src='images/landing-5.jpg'></img>
            <img className='img-6' src='images/landing-6.jpg'></img>
            <div className='T'>T</div>
            <div className='R'>R</div>
            <div className='A'>A</div>
            <div className='V'>V</div>
            <div className='E'>E</div>
            <div className='L'>L</div>
        </div>
    )
}

export default Landing;
