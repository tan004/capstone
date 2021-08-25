import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children : <Redirect to='/login' /> }
    </Route>
  )
};


export default ProtectedRoute;
