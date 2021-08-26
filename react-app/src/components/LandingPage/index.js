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

                        <div>{restaurant?.title}</div>
                        <div>bookmarked by:{restaurant?.bookmark_users}</div>
                        <div>{restaurant?.city}</div>

                    </NavLink>
                )}
            </div>

        </div>
    )
}

export default LandingPage;
