import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makeBooking } from "../../store/booking";
import './bookingform.css'


const BookingForm = ({restaurant}) => {
    const { id } = useParams();
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch()
    const history = useHistory()
    const sizeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const [size, setSize] = useState(sizeArr[0]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = {
            size,
            startDate,
            startTime,
            restaurant_id: id,
            user_id: user.id
        }

        const data = await dispatch(makeBooking(form));
        if (data) {
            setErrors(data)
        } else {
            alert('Booking successful')
            history.push(`/users/${user.id}`)
        }

    }


    return (<div className='booking__container'>
        <div className='bookingform-header'>
            <p className='bookingform-p'>Make a reservation</p>
        </div>
        <form className='bookingform__container' onSubmit={handleSubmit}>
            <div className='errors'>
                {errors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>

            <div className='bookingform-size__container'>
                <label>Party size</label>
                <select
                    name='size'
                    className='size-dropdown'
                    onChange={e => setSize(e.target.value)}
                    className='bookingform-size-select'
                >
                    {sizeArr.map(size =>
                        <option value={size} key={size}>
                            {size}
                        </option>)}
                </select>
            </div>


            <div className='bookingform-datetime__container'>
                <div className='form-datetime__container'>
                    <label>Date</label>
                    <input
                        type='date'
                        className='form-date-input'
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='form-datetime__container'>
                    <label>Time</label>
                    <input
                        type='time'
                        min='11:00'
                        max='22:00'
                        className='form-time-input'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
            </div>
            {!user && <span className='form-warning'>Plase login first!</span>}
            <div className='bookingform-submit__container'><button className='bookingform-submit-button' disabled={!user}>Find a table</button></div>
        </form>

        <div className='takeout__container'>
            <div className='takeout-header'>Order takeout</div>

            <div className='takeout-phone'> <i class="fas fa-phone"></i>{restaurant?.phone}</div>
        </div>
    </div >)
}

export default BookingForm;
