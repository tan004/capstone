
import { useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageModal } from '../../context/Modal';
import './userImagePage.css'

const UserImagePage = ({user}) => {
    const images = user.images
    const [showModal, setShowModal] = useState(false)

    const [imageUrl, setImageUrl] = useState('')
    return (
        <div  className='user-right__container'>
           <h2 className='bookmark-header'>all Images</h2>
           <div className='userImage__container' >
                {images.length > 0 ? images.map(image =>
                        <img className='user-image' src={image.imgUrl} alt={image.id} onClick={(e) =>  setImageUrl(e.target.src)}/>
                    ) : null}
            </div>
            {imageUrl && (
                <ImageModal onClose={()=> setShowModal(false)}>
                    <img width='300px' height='300px' src={imageUrl} alt='modal-image'/>
                    <button onClick={()=> setImageUrl('')}>close</button>
                </ImageModal>
                        )}
        </div>
    )
}

export default UserImagePage;
