import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import unknown from '../../images/unknown.jpg'

const ProfileDropDown = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = () => {
        if (showMenu === true) {
            return;
        } else {
            setShowMenu(true)
        }
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);



    return (
        <>
            <div className='profile-button'>
                {user?.icon !== null ?
                    <img onClick={toggleMenu} className='nav-icon' src={user?.icon} alt='user_icon' />
                    : <img onClick={toggleMenu} className='nav-icon' src={unknown} alt='unknown' />
                }
                {/* <i onClick={toggleMenu} className="far fa-user-circle"></i> */}
                {/* <i onClick={toggleMenu} className="fas fa-user-circle "></i> */}
            </div>
            {showMenu && (
                <div className="profile-dropdown">

                    <div className='triangle'>
                        <i className="fas fa-caret-up"></i>
                    </div>

                    <div className="dropdown-list">
                        <NavLink className='profile-link' to={`/users/${user.id}`}>My Profile</NavLink>
                    </div>

                    <div className="dropdown-list">
                        <LogoutButton />
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileDropDown;
