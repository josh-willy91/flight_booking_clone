
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
          <div className='navBarLeft'>
            <NavLink className='navLink' className='middle' to='/bookyeah' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
          <div className='navBarLeft'>
            <NavLink className='navLink' className='left' to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              Dashboard
            </NavLink>
          </div>
          <div className='navBut'>
            <LogoutButton />
          </div>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className='navbar'>
        <ul className='navbarUl'>
          <div className='navBarLeft'>
            <NavLink className='navLink' className='middle' to='/bookyeah' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
          <div className='navBarLeft'>
            <NavLink className='navLink' className='left' to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div className='navBarLeft'>
            <NavLink className='navLink' className='right' to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
