import React from "react";
import { NavLink } from 'react-router-dom';
import '../styles/footer.css'

const Footer = () => {

    return (
        <div className='footer-wrapper'>
            <div className='footer'>
                <div className='gitHub-div'>
                    <a href='https://www.linkedin.com/in/joshua-williams-768b48178/'>
                        <img className='gitHub' src='images/gitHub.png' alt='gitHub'></img>
                    </a>
                </div>
                <div className='linkedIn-div'>
                    <a href='https://github.com/josh-willy91/flight_booking_clone'>
                        <img className='linkedIn' src='images/linkedIn.jpg' alt='linkedIn'></img>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Footer;
