import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './userBookmark.css'

const UserBookmarkPage = ({ loggedInUser, userId }) => {
    // const {userId} = useParams()
    console.log(userId)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    const thisUser = users.find(user => user.id === +userId)
    return (
        <div className='user-right__container'>
            <h2 className='bookmark-header'>all saved Restaurants</h2>

            {thisUser?.bookmarked.map(restaurant =>
                <Link className='bookmark-detail__container' to={`/restaurants/${restaurant.id}`}>
                    <img className='restaurant-booking-img' src={restaurant.profile_pic} />
                    <div className='detail-booking-info bookmark-title'>{restaurant.title}</div>
                </Link>
            )}

        </div>
    )
}
export default UserBookmarkPage;
