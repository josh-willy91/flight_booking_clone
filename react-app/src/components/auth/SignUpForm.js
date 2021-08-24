import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './styles/signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/bookYeah' />;
  }

  const demoSubmit = async() => {
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password))
  };

  return (
    <div className='signup-wrapper'>
      <img className='signupImg' src="images/signup.jpg" alt=""/>
      <div className='form-wrapper'>
        <form className='signupForm' onSubmit={onSignUp}>
          <h3>Signup</h3>
          <ul className='errors-wrapper'>
            {errors.map((error, index) => (
              <li classname='errorsList' key={index}>{error}</li>
            ))}
          </ul>
          <div>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
              required
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={updateLastName}
              value={lastName}
              required
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        <button className='demoUser' onClick={demoSubmit}>Demo User</button>
      </div>
    </div>
  );
};

export default SignUpForm;
