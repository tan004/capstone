import React, { useState } from 'react';
import EditRestaurantForm from './editrestaurantform';
import { Modal } from '../../context/Modal';



const EditRestaurantModal = ({restaurant}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fas fa-pencil-alt"></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditRestaurantForm onClose={() => setShowModal(false)} restaurant={restaurant}/>
                </Modal>
            )}

        </>
    )

}

export default EditRestaurantModal;
