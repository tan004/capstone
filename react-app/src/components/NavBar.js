
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileDropDown from './ProfileDropdown';
import './navbar.css'


const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
      sessionLinks = (
          <ProfileDropDown user={user} />
          )
      } else {
          sessionLinks = (<>
          <NavLink className='signup' to="/signup">Sign Up</NavLink>
          <NavLink className='login' to="/login">Log In</NavLink>
      </>)
  }


  return (
      <div className='navbar__container'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            openBelly
          </NavLink>
        </div>

        <div className='post-icon__container'>
          <NavLink className='post-button' to='/restaurants/new'>Post</NavLink>
          {sessionLinks}
        </div>

      </div>
  );
}

export default NavBar;
