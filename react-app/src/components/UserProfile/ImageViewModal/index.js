import React, { useState } from 'react';
import { ImageModal } from '../../../context/Modal';
import ImageView from './ImageView';
import './imageView.css'

const ImageViewModal = ({image}) => {
    const [showModal, setShowModal] = useState(false);

    return (
    <>
        <img src={image.imgUrl} className='uploaded-images' onClick={() => setShowModal(true)} alt={image.id}/>

        {showModal && (
            <ImageModal onClose={() => setShowModal(false)}>
                <ImageView image={image}/>
            </ImageModal>
        )}
    </>
    )
}

export default ImageViewModal;
