import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchRestaurant } from "../../store/search";



const Search = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [result, setResult] = useState('')

    useEffect(()=> {
        if(query && query.length >= 2){
            dispatch(searchRestaurant(query))
        }
    }, [query])


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
        </div>
    )
}

export default Search;
