
import ImageViewModal from './ImageViewModal';
import './userImagePage.css'

const UserImagePage = ({user}) => {
    const images = user.images

    return (
        <div  className='user-right__container'>
           <h2 className='bookmark-header'>all Images</h2>
           <div className='userImage__container' >
                {images.length > 0 ? images.map(image =>
                        <ImageViewModal image={image}/>
                    ) : <div>You don't have any uploaded images.</div>}
            </div>
        </div>
    )
}

export default UserImagePage;
