import React from 'react';
import {Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <i onClick={onLogout} className="fas logout-button fa-sign-out-alt"> Sign out</i>
};

export default LogoutButton;
