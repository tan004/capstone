import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { makeBooking } from "../../store/booking";
import './bookingform.css'


const BookingForm = () => {
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
           alert(data)
        } else {
            alert('Booking successful')
            history.push(`/users/${user.id}`)
        }

    }


    return (<div>
        <h2>Make a reservation</h2>
        <form onSubmit={handleSubmit}>
        <div className='errors'>
                    {errors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            <div>
                <label>Party size</label>
                <select
                    name='size'
                    className='size-dropdown'
                    onChange={e => setSize(e.target.value)}
                >
                    {sizeArr.map(size =>
                        <option value={size} key={size}>
                            {size}
                        </option>)}
                </select>
            </div>

            <div>
                <label>Date</label>
                <input
                    type='date'
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <lable>Time</lable>
                <input
                    type='time'
                    min='11:00'
                    max='22:00'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            {!user && <span>Plase login first!</span>}
            <div><button disabled={!user}>Find a table</button></div>
        </form>

    </div >)
}

export default BookingForm;
