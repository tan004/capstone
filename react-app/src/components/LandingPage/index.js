import './landingpage.css'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAll } from '../../store/restaurant'

const LandingPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const restaurants = useSelector(state => Object.values(state.restaurants))
    console.log(restaurants)

    useEffect(() => {
        dispatch(getAll())
    },[])

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
            <div></div>
        </div>
    )
}

export default LandingPage;
