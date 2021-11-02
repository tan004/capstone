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
    useEffect(()=> {
        if(query && query.length >= 2){
            dispatch(searchRestaurant(query))
            setShowResult(dataAfterSearch)
        }
    }, [query])
    console.log(dataAfterSearch)
    if(dataAfterSearch){
        result = dataAfterSearch.map((r) =>
         <NavLink to={`/restaurants/${r.id}`} className='resultDiv'>{r.title}</NavLink>
         )
    }

    useEffect(()=> {
        if(query.length < 2){
            setShowResult([])
        }
    },[query])

    return (
        <div>
            <input
                name='searchInput'
                placeholder='Type at least 2 characters to search for restaurants...'
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                className='header-search-bar'
            >
            </input>
            {showResult.length >= 1 ? <div className='result__container'>
                {result}
            </div>: null}
        </div>
    )
}

export default Search;
