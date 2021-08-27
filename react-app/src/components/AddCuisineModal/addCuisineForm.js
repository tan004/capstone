import { useState } from "react";
import { useDispatch } from "react-redux";

import { addCuisineType } from "../../store/cuisine";

const AddCuisineForm = ({ onClose, restaurant }) => {

    const [type, setType] = useState('')
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()



    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            restaurant_id: restaurant.id,
            type,
        }
        const data = await dispatch(addCuisineType(form))
        if (data) {
            setErrors(data)
        } else {
            onClose()
        }
    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
            <div className='errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label>cuisine type</label>
                    <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder='add a new type'
                        name='type'
                        type='text'
                        required
                    />
                </div>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AddCuisineForm;
