import { useEffect, useState } from "react";




const Search = () => {

    const [query, setQuery] = useState('')
    const [result, setResult] = useState('')

    useEffect(()=> {
        if(query && query.length >= 3){
            setResult('this is result')
        }
    }, [query])

    useEffect(()=> {

    },[result])

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
