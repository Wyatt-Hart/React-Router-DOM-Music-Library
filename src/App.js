import { useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import Searchbar from './components/Searchbar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    //Fetch Data
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch (API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      }else{
        setMessage('Not Found')
      }
    }
    fetchData()
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<> 
            <SearchContext.Provider value={{
              term: searchInput,
              handleSearch: handleSearch
            }}>
              <Searchbar />
            </SearchContext.Provider>
            {message}
            <DataContext.Provider value={data}>
              <Gallery />
              
            </DataContext.Provider></>}> 
        </Route>
        <Route path='/album/:id' element={ <AlbumView /> }> </Route>
        <Route path='/artist/:id'element={ <ArtistView /> }> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;