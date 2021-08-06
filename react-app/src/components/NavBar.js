
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/navbar.css'

const NavBar = () => {

  const sessionUser = useSelector((state) => state.session.user)

  if(sessionUser) {
    return (
      <nav className='navbar'>
        <ul className='navbarUl'>
          <h2 className='logo'>BookYeah</h2>
          <li className='navBarLeft'>
            <NavLink className='navLink' className='middle' to='/bookyeah' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='navBarLeft'>
            <NavLink className='navLink' className='left' to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              Dashboard
            </NavLink>
          </li>
          <li className='navBut'>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className='navbar'>
        <ul className='navbarUl'>
          <li className='navBarLeft'>
            <NavLink className='navLink' className='middle' to='/bookyeah' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='navBarLeft'>
            <NavLink className='navLink' className='left' to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li className='navBarLeft'>
            <NavLink className='navLink' className='right' to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
