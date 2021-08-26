import './landingpage.css'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAll } from '../../store/restaurant'
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const restaurants = useSelector(state => Object.values(state.restaurants).reverse())

    useEffect(() => {
        dispatch(getAll())
    },[dispatch])



    return (
        <div>
            <div className='header-image__container'>
               <div className='homeImage'></div>
               <div className='header__container'>

                        <div className='home-header'>
                            <h1 className='header-h1'>You don't need a reason, you need a booking</h1>
                        </div>

                        <div className='search-bar__container'>
                            <input
                                placeholder='search bar'
                                className='header-search-bar'
                            />
                        </div>

                    </div>
            </div>


            <h2 className='sorting-title'>newest</h2>
            <div className='all-business'>
                {restaurants.map(restaurant =>
                    <NavLink to={`/restaurants/${restaurant?.id}`} className='single-business'>
                        <img className='card-img' src={restaurant?.profile_pic}/>

                        <div className='simple-info card-title'>{restaurant?.title}</div>

                        <div className='simple-info'>{user.bookmarked?.includes(restaurant.id) ?
                            <i className="fas red-mark fa-bookmark"></i> : <i className="far fa-bookmark"></i> } {restaurant?.bookmark_users} bookmarked
                        </div>
                        <div className='simple-info card-address'><i className="fas fa-map-marker-alt"></i> {restaurant?.city}, {restaurant.state}</div>

                    </NavLink>
                )}
            </div>

        </div>
    )
}

export default LandingPage;
