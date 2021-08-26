import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import landingOne from '/root/projects/flight_booking_clone/react-app/src/images/landing-1.jpg';
// import landingTwo from '/root/projects/flight_booking_clone/react-app/src/images/landing-2.jpg';
// import landingThree from '/root/projects/flight_booking_clone/react-app/src/images/landing-3.jpg';
// import landingFour from '/root/projects/flight_booking_clone/react-app/src/images/landing-4.jpg';
// import landingFive from '/root/projects/flight_booking_clone/react-app/src/images/landing-5.jpg';
// import landingSix from '/root/projects/flight_booking_clone/react-app/src/images/landing-6.jpg';
import landingOne from '../images/landing-1.jpg';
import landingTwo from '../images/landing-2.jpg';
import landingThree from '../images/landing-3.jpg';
import landingFour from '../images/landing-4.jpg';
import landingFive from '../images/landing-5.jpg';
import landingSix from '../images/landing-6.jpg';
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
            <div className='img-1'>
                <img className='landing-image' src={landingOne}></img>
            </div>
            <div className='img-2'>
                <img className='landing-image' src={landingTwo}></img>
            </div>
            <div className='img-3'>
                <img className='landing-image' src={landingThree}></img>
            </div>
            <div className='img-4'>
                <img className='landing-image' src={landingFour}></img>
            </div>
            <div className='img-5'>
                <img className='landing-image' src={landingFive}></img>
            </div>
            <div className='img-6'>
                <img className='landing-image' src={landingSix}></img>
            </div>
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
