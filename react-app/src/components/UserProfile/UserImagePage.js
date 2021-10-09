
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserImages } from '../../store/image';
import ImageViewModal from './ImageViewModal';
import './userImagePage.css'

const UserImagePage = ({ user }) => {
    const images = useSelector(state => Object.values(state.images).reverse())

    const dispatch = useDispatch()

    const groupImages = (array, key) => {
        return array.reduce((result, obj) => {
            (result[obj[key]] = result[obj[key]] || []).push(obj)
            return result;
        }, {});
    }


    useEffect(() => {
        dispatch(getUserImages(user.id))
    }, [dispatch])

    let groupedImages = groupImages(images, 'restaurant_id')
    let groupedImagesArr = Object.values(groupedImages)

    return (
        <div className='user-right__container'>
            <h2 className='bookmark-header'>all Images</h2>
            <div className='userImage__container' >
                {groupedImagesArr.length > 0 ? groupedImagesArr.map((restaurant, idx) =>
                    <div className='restaurant-images__container' key={idx}>
                        <Link to={`/restaurants/${restaurant[0].restaurant_id}`} className='resetaurant-name'>{restaurant[0].restaurant}</Link>
                        <div className='overflow-image__container'>
                            {restaurant.map(image =>
                                <ImageViewModal image={image} key={image.id} />
                            )}
                        </div>

                    </div>
                ) : <div>You don't have any uploaded images.</div>}
            </div>
        </div>
    )
}

export default UserImagePage;
