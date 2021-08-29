
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileDropDown from './ProfileDropdown';
import './navbar.css'
import applogo from '../images/logo2.png'


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
        <div className='applogo__container'>
          <NavLink className='applogo-link' to='/' exact={true} activeClassName='active'>
            <img  className='applogo-img' src={applogo} alt='applogo'/>
          </NavLink>
        </div>

        <div className='post-icon__container'>
          <NavLink className='post-button' to='/restaurants/new'>For Business</NavLink>
          {sessionLinks}
        </div>

      </div>
  );
}

export default NavBar;
