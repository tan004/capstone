import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOne } from "../../store/restaurant";
import './detailpage.css'



const RestaurantPage = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const restaurant = useSelector(state => state.restaurants[id])
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getOne(id))
    }, [])

    console.log(restaurant?.profile_pic)


    return (
        <div className='detail-page__container'>

            <div className='profile-pic__container' style={{
                backgroundImage: `url(${restaurant?.profile_pic})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>


                <div className='information__container'>
                    <div className='detail-nav'>header nav bar</div>
                    <h1>{restaurant?.title}</h1>
                    <div>{restaurant?.description}</div>
                    <div>
                    <h3>Cuisine</h3>
                    {restaurant?.cuisine_type.map(type =>
                        <div>
                            {type}
                        </div>
                        )}
                    </div>
                    <div>
                        <h2>location</h2>
                        <p>{restaurant?.location}</p>
                    </div>
                    <div>
                        <h2>Menu</h2>
                        <a href=''>Click here to view the menu</a>
                    </div>
                    <div>
                        <h2>Photo Feed</h2>
                    </div>
                    <div>
                        <h2> Reviews</h2>
                    </div>

                    <div className='booking__container'>
                        <h2>Make a reservation</h2>
                        <div>party size</div>
                    </div>


                </div>

            </div>


        </div>
    )
}


export default RestaurantPage;
