// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './userBookmark.css'

const UserBookmarkPage = ({ user }) => {
    // const {userId} = useParams()
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, [userId]);


    // const thisUser = users.find(user => user.id === +userId)
    // console.log(thisUser)

    return (
        <div className='user-right__container'>
            <h2 className='bookmark-header'>all saved Restaurants</h2>

            {user?.bookmarked.map(restaurant =>
                (<Link className='bookmark-detail__container' to={`/restaurants/${restaurant.id}`} key={restaurant.id} >
                    <img className='restaurant-booking-img' src={restaurant.profile_pic} alt='profile_pic'/>
                    <div className='detail-booking-info bookmark-title'>{restaurant.title}</div>
                </Link>)
            )}

        </div>
    )
}
export default UserBookmarkPage;
