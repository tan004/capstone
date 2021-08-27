import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './restaurantform.css'
import { newRestaurant } from "../../store/restaurant";
import { Redirect ,useHistory } from "react-router-dom";

const RestaurantForm = () => {
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip_code, setZip_code] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [profile_pic, setProfile_pic] = useState('')

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()

    if (!user) {
        history.push('/')
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            title,
            phone,
            description,
            address,
            city,
            state,
            zip_code,
            lat,
            lng,
            profile_pic
        }
        const data = await dispatch(newRestaurant(form))
        if(data){
            setErrors(data)
        }else{
            history.push('/')
        }

    }



    return (
    <div className='restaurant-form__container'>
        <div className='rest-left__container'>
            {/* <h2>Join the partner you need to get back in action and reconnect with guests</h2> */}

            <div className='rest-right__container'>
            <h3>Connect with us today</h3>
            <p>Fill out the form below</p>

            <form onSubmit={handleSubmit}>
                <div className='errors'>
                    {errors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        type='text'
                        name='title'
                        className='form-input'
                        required
                        placeholder='Restaurant Name*'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='phone'
                        className='form-input'

                        required
                        placeholder='Restaurant phone number*'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='profile_pic'
                        className='form-input'

                        required
                        placeholder='Restaurant dashboard picture*'
                        value={profile_pic}
                        onChange={(e) => setProfile_pic(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='address'
                        className='form-input'

                        required
                        placeholder='Restaurant address*'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='city'
                        className='form-input'

                        required
                        placeholder='Restaurant city*'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='state'
                        className='form-input'

                        required
                        placeholder='Restaurant state*'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='zip_code'
                        className='form-input'

                        required
                        placeholder='Restaurant Zip/Postal code*'
                        value={zip_code}
                        onChange={(e) => setZip_code(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type='text'
                        name='lat'
                        className='form-input'

                        placeholder='Optional: latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='lng'
                        className='form-input'

                        placeholder='Optional: longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        type='text'
                        name='description'
                        className='form-textarea'
                        required
                        placeholder='Restaurant Description*'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='submit__container'><button className='form-submit-button' type='submit'>Submit</button></div>
            </form>
        </div>

        </div>



    </div>)
}

export default RestaurantForm;
