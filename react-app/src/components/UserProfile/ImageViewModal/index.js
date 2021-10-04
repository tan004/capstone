import React, { useState } from 'react';
import { ImageModal } from '../../../context/Modal';
import ImageView from './ImageView';


const ImageViewModal = ({image}) => {
    const [showModal, setShowModal] = useState(false);

    return (
    <>
        <img src={image.imgUrl} width='200px' className='uploaded-image' onClick={() => setShowModal(true)}/>

        {showModal && (
            <ImageModal onClose={() => setShowModal(false)}>
                <ImageView image={image}/>
            </ImageModal>
        )}
    </>
    )
}

export default ImageViewModal;
