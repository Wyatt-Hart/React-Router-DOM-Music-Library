import { useContext, useState } from 'react'
import { SearchContext } from '../context/SearchContext'

function Searchbar(props) {
    let [searchTerm, setSearchTerm] = useState('')
    const {term, handleSearch} = useContext(SearchContext)

    return (
        <form onSubmit={(e)=>props.handleSearch(e, searchTerm)}>
            <input ref={term} type='text' placeholder='Enter a search term here' onChange={(e) => props.handleSearch(e, e.target.value)} />
            <button onClick={(e) => handleSearch(e, term.current.value)} >Submit</button>
        </form>
    )
}

export default Searchbar