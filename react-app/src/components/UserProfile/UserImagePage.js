
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserImages } from '../../store/image';
import ImageViewModal from './ImageViewModal';
import './userImagePage.css'

const UserImagePage = ({user}) => {
    const images = useSelector(state => Object.values(state.images).reverse())
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getUserImages(user.id))
    }, [dispatch])

    return (
        <div  className='user-right__container'>
           <h2 className='bookmark-header'>all Images</h2>
           <div className='userImage__container' >
                {images.length > 0 ? images.map(image =>
                        <ImageViewModal image={image} key={image.id}/>
                    ) : <div>You don't have any uploaded images.</div>}
            </div>
        </div>
    )
}

export default UserImagePage;
