import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './restaurantform.css'

import { Redirect ,useHistory } from "react-router-dom";
import { editRestaurant } from "../../store/restaurant";


const EditRestaurantForm = ({ onClose, restaurant }) => {
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState(restaurant.title)
    const [phone, setPhone] = useState(restaurant.phone)
    const [description, setDescription] = useState(restaurant.description)
    const [address, setAddress] = useState(restaurant.address)
    const [city, setCity] = useState(restaurant.city)
    const [state, setState] = useState(restaurant.state)
    const [zip_code, setZip_code] = useState(restaurant.zip_code)
    const [lat, setLat] = useState(restaurant.lat)
    const [lng, setLng] = useState(restaurant.lng)
    const [profile_pic, setProfile_pic] = useState(restaurant.profile_pic)

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()

    if (!user) {
        return <Redirect to="/login" />;
      }


      const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            id: restaurant.id,
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
        await dispatch(editRestaurant(form))
        onClose()
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
                    <input
                        type='text'
                        name='title'
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
                        placeholder='Optional: latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='lng'
                        placeholder='Optional: longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        type='text'
                        name='description'
                        required
                        placeholder='Restaurant Description*'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div><button type='submit'>Submit</button></div>
            </form>
        </div>
    )
}

export default EditRestaurantForm;
