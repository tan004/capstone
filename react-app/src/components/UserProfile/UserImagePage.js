import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserImagePage = ({user}) => {
    const images = user.images

    return (
        <div  className='user-right__container'>
           <h2 className='bookmark-header'>all Images</h2>
           <div className='userImage' >
                {images.length > 0 ? images.map(image =>
                    <Link to={`/restaurants/${image.restaurant_id}`}>
                        <img width='100px' src={image.imgUrl} alt={image.id}/>
                    </Link>
                    ) : null}
                    </div>
        </div>
    )
}
export default UserImagePage;
