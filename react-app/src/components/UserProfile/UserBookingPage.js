import './UserRightContainer.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings, removeBooking } from '../../store/booking';
import { getAll } from '../../store/restaurant';

const UserBookingPage = ({ loggedInUser }) => {
    const [bookingId, setBookingId] = useState(0)
    // const allRestaurants = useSelector(state => Object.values(state.restaurants))
    const allbookings = useSelector(state => Object.values(state.bookings))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserBookings(loggedInUser.id))
        dispatch(getAll())
    }, [dispatch])


    const bookingArr = allbookings.filter(booking => booking.user_id === loggedInUser.id)

    const sortedBydate = bookingArr.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    const pastBookings = sortedBydate.filter(booking => new Date(booking.time) < Date.now())

    const upcomingBookings = sortedBydate.filter(booking => new Date(booking.time) > Date.now())

    return (
        <div className='user-right__container'>
            <div>
                <h1>Upcoming Reservations</h1>
                {upcomingBookings.length > 0 ? upcomingBookings.map(booking =>
                    <div key={booking.id}>
                        <img width='100px' src={booking.restaurant.profile_pic} />
                        <div>{booking.restaurant.title}</div>
                        <span>{booking.startTime} {booking.startDate}</span>
                        <div>Table for {booking.size} person(s)</div>
                        <div>{booking.restaurant.phone}</div>
                        <div>{booking.restaurant.location}</div>
                        <div>
                            <span>Modify</span>
                            <span onClick={() => dispatch(removeBooking(booking.id, booking.user_id))}>delete</span>
                        </div>
                    </div>
                ) : <div>You dont have any reservation</div>}
            </div>

            <div>
                <h2>Past reservations</h2>
                {pastBookings.length > 0 ? pastBookings.map(booking =>
                    <div key={booking.id}>
                        <img width='100px' src={booking.restaurant.profile_pic} />
                        <div>{booking.restaurant.title}</div>
                        <span>{booking.startTime} {booking.startDate}</span>
                        <div>Table for {booking.size} person(s)</div>
                        <div>{booking.restaurant.phone}</div>
                        <div>{booking.restaurant.location}</div>

                    </div>
                ) : <div>You dont have any past reservation</div>}
            </div>
        </div>
    )
}
export default UserBookingPage;
