import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, useParams, Link } from 'react-router-dom';
import UserBookingPage from './UserBookingPage';
import UserBookmarkPage from './UserBookmarkPage';
import UserProfileNavBar from './UserProfileNavBar';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getUserBookings } from '../../store/booking';
import { getAll } from '../../store/restaurant';
import unknown from '../../images/unknown.jpg'

function User() {
  // const [user, setUser] = useState({});
  const loggedInUser = useSelector(state => state.session.user)
  const { userId } = useParams();
  const [currentView, setView] = useState('booking')


  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const user = users.find(user => user.id === +userId)

  let view
  if (user?.id !== loggedInUser?.id && currentView === 'booking') {
    view = <UserBookmarkPage loggedInUser={loggedInUser} userId={userId} />

  } else if (user?.id === loggedInUser?.id && currentView === 'booking') {
    view = <UserBookingPage loggedInUser={loggedInUser} />

  } else {
    view = <UserBookmarkPage loggedInUser={loggedInUser} userId={userId} />
  }


  if (!loggedInUser) {
    return null;
  }


  return (
    <div className='userprofile__container'>
      <BrowserRouter>
        <UserProfileNavBar userId={userId} />
        <Switch>
          <ProtectedRoute path='/users/:userId' exact={true}>
            {user?.id === loggedInUser?.id ?
              <UserBookingPage loggedInUser={loggedInUser} /> :
              <UserBookmarkPage userId={userId} />
            }
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId/favorite' exact={true}>
            <UserBookmarkPage userId={userId} />
          </ProtectedRoute>

        </Switch>
      </BrowserRouter>


      {/* <div className='user-navbar__container'>
        <div className='nav-user__container'>

          {user?.icon !== null ?
            <img className='nav-user-icon' src={user?.icon} />
            : <img className='nav-user-icon' src={unknown} />
          }

          <span>{user?.username}</span>
        </div>


        {user?.id === loggedInUser?.id ?
          <div className='links__container'>
            <p className='booking-link nav-link' onClick={() => setView('booking')} >Reservations</p>
            <p className='bookmark-link nav-link' onClick={() => setView('bookmark')} >Saved Restaurants</p>
          </div> : null
        }

      </div>

      {view} */}

    </div>
  );
}
export default User;
