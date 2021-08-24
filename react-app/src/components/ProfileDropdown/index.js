import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";


const ProfileDropDown = ({ user }) => {
    const dispatch = useDispatch();
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
            <i onClick={toggleMenu} className="fas fa-user-circle "></i>
            </div>
            {showMenu && (
                <div className="profile-dropdown">
                    <div className='triangle'>
                        <i className="fas fa-caret-up"></i>
                    </div>

                    <div className="dropdown-list">
                        <NavLink to={`/users/${user.id}`}>Profile</NavLink>
                    </div>

                    <div>
                      <LogoutButton />
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileDropDown;
