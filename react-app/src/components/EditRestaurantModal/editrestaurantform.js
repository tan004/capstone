import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './editrestaurantform.css'

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
        <div className='editform__container'>
            <h2 className='editform-header'>Update business information</h2>
            <form onSubmit={handleSubmit}>
                <div className='errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div className='editform-div'>
                    <label>Name</label>
                    <input
                    className='editform-input'
                        type='text'
                        name='title'
                        required
                        placeholder='Restaurant Name*'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>Phone number</label>
                    <input

                        type='text'
                        className='editform-input'
                        name='phone'
                        required
                        placeholder='Restaurant phone number*'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>Profile picture URL</label>
                    <input
                    className='editform-input'

                        type='text'
                        name='profile_pic'
                        required
                        placeholder='Restaurant dashboard picture*'
                        value={profile_pic}
                        onChange={(e) => setProfile_pic(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>Address</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='address'
                        required
                        placeholder='Restaurant address*'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>City</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='city'
                        required
                        placeholder='Restaurant city*'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>State</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='state'
                        required
                        placeholder='Restaurant state*'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                <label>Postal code</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='zip_code'
                        required
                        placeholder='Restaurant Zip/Postal code*'
                        value={zip_code}
                        onChange={(e) => setZip_code(e.target.value)}
                    />
                </div>

                <div className='editform-div'>
                <label>Optional: latitude</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='lat'
                        placeholder='Optional: latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div className='editform-div'>
                        <label>Optional: longitude</label>
                    <input
                        type='text'
                        className='editform-input'
                        name='lng'
                        placeholder='Optional: longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </div>

                <div className='editform-div'>
                    <label>Description</label>
                    <textarea
                        type='text'
                        className='editform-textarea'
                        name='description'
                        required
                        placeholder='Restaurant Description*'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='editform-button__container'><button className='editform-submit' type='submit'>Submit</button></div>
            </form>
        </div>
    )
}

export default EditRestaurantForm;
