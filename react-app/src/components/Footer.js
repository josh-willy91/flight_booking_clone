import React from "react";
import { NavLink } from 'react-router-dom';
import './styles/footer.css'
// import gitHub from '/root/projects/flight_booking_clone/react-app/src/images/gitHub.png';
// import linkedIn from '/root/projects/flight_booking_clone/react-app/src/images/linkedIn.jpg';
import gitHub from '../images/gitHub.png';
import linkedIn from '../images/linkedIn.jpg';


const Footer = () => {

    return (
        <div className='footer-wrapper'>
            <div className='footer'>
                <div className='gitHub-div'>
                    <a href='https://www.linkedin.com/in/joshua-williams-768b48178/'>
                        <img className='gitHub' src={gitHub} alt='gitHub'></img>
                    </a>
                </div>
                <div className='linkedIn-div'>
                    <a href='https://github.com/josh-willy91/flight_booking_clone'>
                        <img className='linkedIn' src={linkedIn} alt='linkedIn'></img>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Footer;
