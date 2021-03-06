import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
// import planeImage from '/root/projects/flight_booking_clone/react-app/src/images/plane.jpg';
import planeImage from '../../images/plane.jpg';
import './styles/login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoSubmit = async() => {
    const email = 'demo@aa.io'
    const password = 'password'
    await dispatch(login(email, password))
  };

  if (user) {
    return <Redirect to='/bookYeah'/>;
  }

  return (
    <div className='login-wrapper'>
      <img className='loginImg' src={planeImage} alt=""/>
      <div className='form-wrapper'>
        <form className='loginForm' onSubmit={onLogin}>
          <h3>Login</h3>
          <ul className='errors-wrapper'>
            {errors.map((error, index) => (
              <li classname='errorsList' key={index}>{error}</li>
            ))}
          </ul>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className='formButton' type='submit'>Login</button>
        </form>
        <button className='demoUser' onClick={demoSubmit}>Demo User</button>
      </div>
    </div>
  );
};

export default LoginForm;
