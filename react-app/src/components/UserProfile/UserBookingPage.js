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
            <div className='upcoming__container'>
                <h2 className='upcoming-header'>Upcoming Reservations</h2>
                {upcomingBookings.length > 0 ? upcomingBookings.map(booking =>
                    <div className='upcoming-detail__container' key={booking.id}>
                        <img className='restaurant-booking-img' src={booking.restaurant.profile_pic} />
                        <div className='booking-info__container'>
                            <div className='detail-booking-info booking-title'>{booking.restaurant.title}</div>
                            <span className='detail-booking-info booking-datetime'>{booking.startTime} {booking.startDate}</span>
                            <div className='detail-booking-info booking-size'>Table for {booking.size} person(s)</div>
                            <div className='detail-booking-info booking-phone'>{booking.restaurant.phone}</div>
                            <div className='detail-booking-info booking-address'>{booking.restaurant.location}</div>
                            <div className='detail-booking-info booking-admin__container'>
                                <span className='booking-admin__button booking-edit'
                                    onClick={() => alert('Please contact the restaurant with the provided phone number to modify your reservation. Thank you!') }
                                >Modify</span>
                                <span className='booking-admin__button booking-delete' onClick={() => dispatch(removeBooking(booking.id, booking.user_id))}>delete</span>
                            </div>
                        </div>
                    </div>
                ) : <div  className='upcoming-detail__container'>You dont have any reservation</div>}
            </div>

            <div className='past__container'>
                <h2 className='upcoming-header'>Past reservations</h2>
                {pastBookings.length > 0 ? pastBookings.map(booking =>
                    <div className='upcoming-detail__container' key={booking.id}>
                        <img className='restaurant-booking-img' src={booking.restaurant.profile_pic} />
                        <div className='booking-info__container'>
                            <div className='detail-booking-info booking-title'>{booking.restaurant.title}</div>
                            <span className='detail-booking-info booking-datetime'>{booking.startTime} {booking.startDate}</span>
                            <div className='detail-booking-info booking-size'>Table for {booking.size} person(s)</div>
                            <div className='detail-booking-info booking-phone'>{booking.restaurant.phone}</div>
                            <div className='detail-booking-info booking-address'>{booking.restaurant.location}</div>

                        </div>
                    </div>
                        ) : <div className='upcoming-detail__container'>You dont have any past reservation</div>}
                    </div>
        </div>
            )
}
            export default UserBookingPage;
