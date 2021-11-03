import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchRestaurant } from "../../store/search";
import './search.css'


const Search = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [showResult, setShowResult] = useState([])
    const dataAfterSearch = useSelector(state => state.search.restaurants)

    let result = [];
// if the input bar is not empty, dispatch the search function.
    useEffect(()=> {
        if(query !== ''){
            dispatch(searchRestaurant(query))
        }

    }, [query, dispatch])

    useEffect(()=> {
            // if we have data, put into showresult.
            if(dataAfterSearch?.length > 0){
                setShowResult(dataAfterSearch)
            }
    },[dataAfterSearch])

// check if search bar is empty.
    useEffect(()=> {
        if(!query){
            setShowResult([])
        }
    }, [query])

    if(dataAfterSearch){
        result = dataAfterSearch.map((r) =>
            <NavLink key={r.id} to={`/restaurants/${r.id}`} className='resultDiv'>{r.title}</NavLink>
        )
    }

// close the result div, if clicked on other places.
    useEffect(()=> {
        const closeResult = () => {
            setQuery('')
            setShowResult([])
        }

        document.addEventListener('click', closeResult);

        return () => document.removeEventListener("click", closeResult);
    },[])

    return (
        <div>
            <input
                name='searchInput'
                placeholder='Search reastaurants...'
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                className='header-search-bar'
            >
            </input>
            {showResult && showResult.length >= 1 ?  <div className='result__container'>
                {result}
            </div>: null}
        </div>
    )
}

export default Search;
