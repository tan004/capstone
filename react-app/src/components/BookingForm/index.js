import { useState } from "react";



const BookingForm = () => {
    const sizeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const [size, setSize] = useState(sizeArr[0]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');



    return (<div>
        <h2>Make a reservation</h2>
        <form>
            <div>
                <label>Party size</label>
                <select
                    name='size'
                    className='size-dropdown'
                    onChange={e => setSize(e.target.value)}
                >
                    {sizeArr.map(size => <option value={size} key={size}>
                        {size}
                    </option>)}
                </select>
            </div>

            <div>
                <label>Date</label>
                <input
                    type='date'
                    required
                />
            </div>

            <div>
                <lable>Time</lable>
                <input
                    type='time'
                    min='11:00'
                    max='22:00'
                    required
                />
            </div>
            <div><button>Find a table</button></div>
        </form>

    </div >)
}

export default BookingForm;
