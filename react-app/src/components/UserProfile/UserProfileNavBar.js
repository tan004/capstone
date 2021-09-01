import { useSelector } from "react-redux"
import { Link} from "react-router-dom";
import './userNavbar.css'
import { useEffect, useState } from "react";
import unknown from '../../images/unknown.jpg'

const UserProfileNavBar = ({userId}) => {
  const loggedInuser = useSelector(state => state.session.user)
  // const {userId } = useParams()
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
      <div className='nav-user__container'>

          {user?.icon !== null ?
            <img className='nav-user-icon' src={user?.icon} alt={`usericon-${user?.id}`} />
            : <img className='nav-user-icon' src={unknown} alt='unknown'/>
          }

          <span>{user?.username}</span>
      </div>


      {user?.id === loggedInuser?.id ?
        <div className='links__container'>
          <Link className='booking-link nav-link' to={`/users/${user?.id}`} >Reservations</Link>
          <Link className='bookmark-link nav-link'  to={`/users/${user?.id}/favorite`}>Saved Restaurants</Link>
        </div> : null
      }

    </div>
  )
}

export default UserProfileNavBar;
