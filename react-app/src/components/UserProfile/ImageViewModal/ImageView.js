import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from '../../../store/image';
import './imageView.css'

const ImageView = ({image}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [deleteClicked,  setDeleteClicked] = useState(false)

        const handleDelete = async(e) => {
            e.preventDefault()
            await dispatch(removeImage(image.id, image.user_id))
        }


    let deleteWarningDiv;
    if(deleteClicked){
        deleteWarningDiv = (
            <div className='imageModal__container'>
                <p className='delete-warning'>Please confirm that you want to delete this picture.</p>
                <div>
                    <button onClick={handleDelete} className='image-delete-button'>Confirm</button>
                    <button className='go-back-button' onClick={() => setDeleteClicked(false)}>Back</button>
                </div>
            </div>
        )
    }

    return (
        <div className='imageModal__container'>
            <img className='imageInModal' src={image.imgUrl} alt={image.id} />
            {deleteClicked === false ? <button onClick={()=> setDeleteClicked(true)} className='image-delete-button'>Delete</button>: deleteWarningDiv}
        </div>
    )
}

export default ImageView;
