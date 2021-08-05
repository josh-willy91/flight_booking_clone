import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../store/session';
import { Redirect } from 'react-router-dom';


const LogoutButton = () => {
  const history = useHistory()
  // const user = useSelector(state => state.session.user);


  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/login')
  };


  // if(!user) {
  //   return <Redirect to='/login'/>;
  // }

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
