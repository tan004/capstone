import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";




const Search = () => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [result, setResult] = useState('')

    useEffect(()=> {
        if(query && query.length >= 3){

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
