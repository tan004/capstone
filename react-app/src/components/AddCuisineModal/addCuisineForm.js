import { useState } from "react";
import { useDispatch } from "react-redux";

import { addCuisineType } from "../../store/cuisine";
import './addCuisine.css'

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
        <div className='cuisineForm__container'>
            <h3 className='cuisine-header'>Add the Cuisine type below</h3>
            <form className='addCuisineForm' onSubmit={handleSubmit}>
            <div className='errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='cuisine-input__container'>
                    <label>Cuisine type: </label>
                    <input
                        className='cuisine-input'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder='add a new type'
                        name='type'
                        type='text'
                        required
                    />
                </div>
                <button className='addcuisine-button' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddCuisineForm;
