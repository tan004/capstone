import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
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
            <button className='profile-button' onClick={toggleMenu}>
                <i className="far fa-address-card"></i>
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    <div className='triangle'>
                        <i className="fas fa-caret-up"></i>
                    </div>
                    <div className="dropdown-list">{user.username}</div>
                    <div className="dropdown-list">{user.email}</div>
                    <div>
                      <LogoutButton />
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileDropDown;
