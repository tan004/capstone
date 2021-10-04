import { useSelector } from 'react-redux';
import './imageView.css'

const ImageView = ({image}) => {
    const user = useSelector(state => state.session.user)

    return (
        <div className='imageModal__container'>
            <img className='imageInModal' src={image.imgUrl} />
            {image.user_id === user.id ? <button className='image-delete-button'>Delete</button>: null}
        </div>
    )
}
export default ImageView;
