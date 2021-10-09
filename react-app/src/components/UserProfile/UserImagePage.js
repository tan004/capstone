
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserImages } from '../../store/image';
import restaurants, { getAll } from '../../store/restaurant';
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
        // dispatch(getAll())
    }, [dispatch])

    let groupedImages = groupImages(images, 'restaurant_id')
    let groupedImagesArr = Object.values(groupedImages)

    console.log(groupedImagesArr)
    return (
        <div className='user-right__container'>
            <h2 className='bookmark-header'>all Images</h2>
            <div className='userImage__container' >
                {groupedImagesArr.length > 0 ? groupedImagesArr.map((restaurant, idx) =>
                    <div className='restaurant-images__container' key={idx}>
                        <p>{restaurant[0].restaurant}</p>
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
