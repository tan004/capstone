
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './auth/LoginFormModal';
import ProfileDropDown from './ProfileDropdown';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
      sessionLinks = (
          <ProfileDropDown user={user} />
          )
      } else {
          sessionLinks = (<>
          <LoginFormModal />
          <NavLink className='signup' to="/signup">Sign Up</NavLink>
      </>)
  }


  return (
    <nav>
      <div>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>

        <div>
          {sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
