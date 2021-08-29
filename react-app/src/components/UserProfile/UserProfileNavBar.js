import { useSelector } from "react-redux"
import { NavLink,Link } from "react-router-dom";
import './userNavbar.css'

const UserProfileNavBar = () => {
    const user = useSelector(state => state.session.user)


    return (
        <div className='user-navbar__container'>
            <div><img src={user.icon}/></div>

            <div>
                <strong>Username</strong> {user.username}
            </div>

            <Link to={`/users/${user.id}`} >Reservation</Link>

            <Link to={`/users/${user.id}/favorite`}>Saved Restaurant</Link>
        </div>

    )
}

export default UserProfileNavBar;
