import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchRestaurant } from "../../store/search";
import './search.css'


const Search = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    // const [result, setResult] = useState('')
    const dataAfterSearch = useSelector(state => state.search.restaurants)
    console.log(dataAfterSearch)
    useEffect(()=> {
        if(query && query.length >= 2){
            dispatch(searchRestaurant(query))
        }
    }, [query])

    let result = [];
    if(dataAfterSearch){
        result = dataAfterSearch.map((r) =>
         <NavLink to={`/restaurants/${r.id}`} className='resultDiv'>{r.title}</NavLink>
         )
    }


    return (
        <div>
            <input
                name='searchInput'
                placeholder='Search for restaurant name...'
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                className='header-search-bar'
            >
            </input>
            <div>
                {result}
            </div>
        </div>
    )
}

export default Search;
