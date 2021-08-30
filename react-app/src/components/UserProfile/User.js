import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, useParams } from 'react-router-dom';
import UserBookingPage from './UserBookingPage';
import UserBookmarkPage from './UserBookmarkPage';
import UserProfileNavBar from './UserProfileNavBar';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getUserBookings } from '../../store/booking';
import { getAll } from '../../store/restaurant';

function User() {
  // const [user, setUser] = useState({});
  const loggedInUser = useSelector(state => state.session.user)
  const { userId } = useParams();
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [dispatch, userId]);




  if (!loggedInUser) {
    return null;
  }


  return (
    <div className='userprofile__container'>
      <BrowserRouter>
        <UserProfileNavBar  userId={userId} />

      <Switch>
        <ProtectedRoute path='/users/:userId' exact={true} >
        {loggedInUser?.id === +userId ?
          <UserBookingPage loggedInUser={loggedInUser}/> : <UserBookmarkPage />}
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId/favorite' exact={true}>
          <UserBookmarkPage />
        </ProtectedRoute>
      </Switch>
      </BrowserRouter>
    </div>
  );
}
export default User;