import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './signup.css'
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [icon, setIcon] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, icon));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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
  const updateIcon = (e) => {
    setIcon(e.target.value);
  };



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form__container'>
      <h1 className="form-title">Sign up</h1>
    <form className="login-form" onSubmit={onSignUp}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
          <img width='60px' src={icon ? icon : null } alt='showIcon'/>
      </div>
      <div className="input__container">
        <input
          className="input"
          type='text'
          name='username'
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="input__container">
        <input
          className="input"
          type='text'
          name='email'
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="input__container">

        <input
          className="input"
          type='password'
          name='password'
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="input__container">
        <input
          type='password'
          name='repeat_password'
          className="input"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="input__container">
        <input
          type='text'
          name='icon'
          className="input"
          placeholder="Optional: Image Url for Icon"
          onChange={updateIcon}
          value={icon}
        ></input>
      </div>

      <button className="log-in-button" type='submit'>Sign Up</button>
    </form>
    <div className="sign-up__container">
    <p className="sign-up-text">
      Already have an account?{" "}
      <NavLink className="sign-up-link" to="/login">
        Log in
      </NavLink>
    </p>
  </div>
  </div>
  );
};

export default SignUpForm;
