import { useSelector } from "react-redux"
import { NavLink,Link, useParams } from "react-router-dom";
import './userNavbar.css'
import { useEffect, useState } from "react";

const UserProfileNavBar = ({userId}) => {
    const loggedInuser = useSelector(state => state.session.user)

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

    return (
        <div className='user-navbar__container'>
            <div><img src={user?.icon}/></div>

            <div>
                <strong>Username</strong> {user?.username}
            </div>

            {user?.id === loggedInuser?.id ?
            <>
            <Link to={`/users/${user?.id}`} >Reservation</Link>
             <Link to={`/users/${user?.id}/favorite`}>Saved Restaurant</Link>
            </>: null
            }

        </div>
    )
}

export default UserProfileNavBar;
