
import './landingpage.css'

const LandingPage = () => {
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
