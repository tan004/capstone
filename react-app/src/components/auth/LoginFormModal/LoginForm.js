import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect,NavLink } from 'react-router-dom';
import { login } from '../../../store/session';
import './login-signup.css'


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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form__container'>

    <h1 className='form-title'>Log in here</h1>
    <form className='login-form' onSubmit={onLogin}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='input__container'>

        <input
          className='input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='input__container'>

        <input
          className='input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <div>
        <button className="log-in-button" type='submit'>Login</button>
          </div>
    </form>
    <div className="sign-up__container">
        <p className="sign-up-text">
          Don't have an account?{" "}
          <NavLink className="sign-up-link" to="/signup">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
