import React, { useState } from 'react';
import EditRestaurantForm from './editrestaurantform';
import { Modal } from '../../context/Modal';



const EditRestaurantModal = ({restaurant}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditRestaurantForm restaurant={restaurant}/>
                </Modal>
            )}

        </>
    )

}

export default EditRestaurantModal;
