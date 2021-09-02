import './landingpage.css'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAll } from '../../store/restaurant'
import { NavLink } from 'react-router-dom';
import githublogo from '../../images/github32.png'
import { getUserBookings } from '../../store/booking';

const LandingPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const restaurants = useSelector(state => Object.values(state.restaurants).reverse())

    const [imageNum, setImageNum] = useState('https://cdn.pixabay.com/photo/2012/12/19/18/13/architecture-70920_960_720.jpg')

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            dispatch(getUserBookings(user.id))
        }
    }, [user, dispatch])

    useEffect(() => {
        const interval = setInterval(() => {

            let allImages = ['https://cdn.pixabay.com/photo/2012/12/19/18/13/architecture-70920_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/02/16/22/18/wines-1204167__340.jpg',
                'https://cdn.pixabay.com/photo/2018/04/18/17/22/dessert-3331009__340.jpg',
                'https://cdn.pixabay.com/photo/2016/09/02/10/43/table-1638826__340.jpg',
                'https://cdn.pixabay.com/photo/2018/01/22/08/54/dining-room-3098474__340.jpg'
            ]

            function getRandomInt(max) {
                let randomNum = Math.floor(Math.random() * max);
                return allImages[randomNum]
            }

            setImageNum(getRandomInt(5))

        }, 10000);
        return () => clearInterval(interval)
    }, [])


    return (
        <div>
            <div className='header-image__container'>
                <div className='homeImage' style={{
                    backgroundImage: `url(${imageNum})`
                }}></div>

                <div className='header__container'>

                    <div className='home-header'>
                        <h1 className='header-h1'>You don't need a reason, you need a booking</h1>
                    </div>

                    {/* <div className='search-bar__container'>
                        <input
                            placeholder='search bar'
                            className='header-search-bar'
                        />
                    </div> */}

                </div>
            </div>


            <h2 className='sorting-title'>newest</h2>
            <div className='all-business'>
                {restaurants.map(restaurant =>
                    <NavLink to={`/restaurants/${restaurant?.id}`} className='single-business' key={restaurant.id}>
                        <img className='card-img' src={restaurant?.profile_pic} alt={`card-${restaurant?.id}`} />

                        <div className='simple-info card-title'>{restaurant?.title}</div>

                        <div className='simple-info'>{restaurant?.bookmark_users?.includes(user?.id) ?
                            <i className="fas red-mark fa-bookmark"></i> : <i className="far fa-bookmark"></i>} {restaurant?.bookmark_users.length} bookmarked
                        </div>
                        <div className='simple-info card-address'><i className="fas fa-map-marker-alt"></i> {restaurant?.city}, {restaurant.state}</div>

                    </NavLink>
                )}
            </div>
            <div className='footer'>
                <a href='https://github.com/tan004/capstone'><img className='githublogo' src={githublogo} alt='githublogo' /></a>
                <a href='https://www.linkedin.com/in/zhuoxin-tan-491587172/'><i className="fab fa-linkedin"></i></a>
            </div>
        </div>
    )
}

export default LandingPage;
