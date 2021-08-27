import React, { useState } from 'react';
import { CuisineModal } from '../../context/Modal';

import AddCuisineForm from './addCuisineForm';

const AddCuisineModal = ({restaurant}) => {
    const [showModal, setShowModal] = useState(false);
    return (
    <>
        <i onClick={() => setShowModal(true)} className="fas fa-plus"></i>
        {showModal && (
            <CuisineModal onClose={() => setShowModal(false)}>
                <AddCuisineForm onClose={()=> setShowModal(false)} restaurant={restaurant} />
            </CuisineModal>
        )}
    </>
    )
}

export default AddCuisineModal;
