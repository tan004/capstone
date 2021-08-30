import'./UserRightContainer.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from '../../store/booking';
import { getAll } from '../../store/restaurant';

const UserBookingPage = ({loggedInUser}) => {

    const allRestaurants = useSelector(state => Object.values(state.restaurants))
    const allbookings = useSelector(state => Object.values(state.bookings))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserBookings(loggedInUser.id))
        dispatch(getAll())
      }, [dispatch])

    const bookingArr = allbookings.filter(booking => booking.user_id === loggedInUser.id)

    console.log(loggedInUser)
    console.log(allRestaurants)
    console.log(allbookings.filter(booking => booking.user_id === loggedInUser.id))

    return (
        <div className='user-right__container'>
            <div>
                <h1>all reservation</h1>
                {bookingArr.length > 0 ? bookingArr.map(booking =>
                    <div>
                        <img width='100px' src={booking.restaurant.profile_pic}/>
                        <div>{booking.restaurant.title}</div>
                        <span>{booking.startTime.slice(0, 5)} {booking.startDate}</span>
                        <div>Table for {booking.size} person(s)</div>
                        <div>{booking.restaurant.phone}</div>
                        <div>{booking.restaurant.location}</div>

                    </div>
                    ): <div>You dont have any reservation</div> }
            </div>
        </div>
    )
}
export default UserBookingPage;
