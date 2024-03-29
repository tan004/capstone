import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getRestaurantBookings } from "../../store/booking";
import { cuisineForOne } from "../../store/cuisine";
import { imagesForOne } from "../../store/image";
import { addBookmark, deleteRestaurant, getOne } from "../../store/restaurant";
import AddCuisineModal from "../AddCuisineModal";
import BookingForm from "../BookingForm";

import EditRestaurantModal from "../EditRestaurantModal";
import UploadImageForm from "../UploadImageForm";
import './detailpage.css'



const RestaurantPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const restaurant = useSelector(state => state.restaurants[id])
    const cuisinesArr = useSelector(state => Object.values(state.cuisines))
    const imagesArr = useSelector(state => Object.values(state.images).reverse())
    const dispatch = useDispatch()
    const history = useHistory()
    const [showmore, setShowmore] = useState(false)
    const [uploadDiv, setUploadDiv] = useState(false)
    const [getMark, setMark] = useState(false)

    const filteredCuisine = cuisinesArr.filter(cuisine => cuisine.restaurant_id === +id)
    const filteredImages= imagesArr.filter(image => image.restaurant_id === +id)


    useEffect(() => {
        dispatch(getOne(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(cuisineForOne(id))
        dispatch(getRestaurantBookings(id))
        dispatch(imagesForOne(id))
    }, [dispatch, id])

    //only dispatching the action to update the restaurant status,
    //TODO: user's status is not updated at the same time
    useEffect(() => {
        if (getMark) {
            dispatch(addBookmark(id))
            setMark(false)
        }
    }, [id, dispatch, getMark])

    const onDelete = async () => {
        await dispatch(deleteRestaurant(id))
        history.push('/')
    }

    let admin;
    if (user?.id === restaurant?.owner?.id) {
        admin = user
    }

    const toggle = () => {
        if (!showmore) {
            setShowmore(true)
            document.getElementById('more').classList.add('more')
            document.getElementById('showmore-span').innerText = 'close'
        } else {
            setShowmore(false)
            document.getElementById('more').classList.remove('more')
            document.getElementById('showmore-span').innerText = '...more'
        }
    }

    const handleUpload = () => {
        if(uploadDiv === false){
            setUploadDiv(true)
        }else{
            setUploadDiv(false)
        }
    }


    let bookmarkDiv;
    if(restaurant?.bookmark_users?.includes(user?.id)){
        bookmarkDiv = (
            <div className='bookmark-div' onClick={()=> setMark(true)}>
                <i  className="fas red-mark fa-bookmark"></i>
                <span className='bookmark-span'>Restaurant Saved!</span>
            </div>
        )
    }else{
        bookmarkDiv = (
            <div className='bookmark-div' onClick={()=> setMark(true)}>
                <i className="far fa-bookmark"></i>
                <span className='bookmark-span'>Save this restaurant</span>
            </div>
        )
    }


    return (
        <div className='detail-page__container'>

            {user && bookmarkDiv}

            <div className='profile-pic__container' style={{
                backgroundImage: `url(${restaurant?.profile_pic})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            </div>

            <div className='information__container'>
                <div className='detail-nav'></div>

                <div className='title-admin__container'>
                    <h1 className='detail-title'>{restaurant?.title} </h1>
                    {admin ? <div className='admin__container'>
                        <EditRestaurantModal restaurant={restaurant} />
                        <i onClick={onDelete} className="far fa-trash-alt"></i>
                    </div>
                        : null}
                </div>

                <BookingForm restaurant={restaurant}/>


                <div className='detail-description__container'>
                    <div id='more' className='detail-description'>
                        {restaurant?.description}
                    </div>
                    <span id='showmore-span' className='showmore-span' onClick={toggle}>...more</span>
                </div>

                <div className='detail-component__container'>
                    <div className='detail-h3'>
                        <h3 >Cuisine</h3>
                        {admin ? <AddCuisineModal restaurant={restaurant} /> : null}
                    </div>
                    <div className='all-cuisines'>
                        {filteredCuisine && filteredCuisine.map(cuisine =>
                            <div className='single-cuisine' key={`cuisine-${cuisine.id}`}>
                               <i className="fas fa-utensils"></i>{cuisine.type}
                            </div>
                        )}
                        {filteredCuisine.length === 0 ? <div>No Cuisine Type Added</div>: null}
                    </div>
                </div>

                <div className='detail-component__container'>
                    <h3 className='detail-h3'>Location</h3>
                    <p className='detail-location'><i className="fas detail-map fa-map-marker-alt"></i> {restaurant?.location}</p>
                </div>

                <div className='detail-component__container'>
                    <div className='detail-h3'>
                        <h3>Photo Feed</h3>
                        {admin ? <i onClick={handleUpload} className="fas fa-plus"></i> : null}
                    </div>
                    {uploadDiv ? <UploadImageForm restaurant={restaurant}/>:null }
                    <div className='imagesList__container'>
                    {filteredImages && filteredImages.map(image => <img className='single-images' src={image.imgUrl} key={image.id} alt={image.id} />)}
                    {filteredImages.length === 0 ? <div>No Image Uploaded</div>: null}
                    </div>
                </div>
                {/* <div className='detail-component__container'>
                    <h3 className='detail-h3'>Menu</h3>
                    <p> put link to view the menu</p>
                </div>
                <div className='detail-component__container'>
                    <h3 className='detail-h3'> Reviews</h3>
                </div> */}

            </div>

        </div>
    )
}


export default RestaurantPage;
