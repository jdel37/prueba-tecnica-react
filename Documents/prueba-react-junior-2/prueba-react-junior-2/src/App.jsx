import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './Components/Movies.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
     
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    handleSort()
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
    handleSort
  }
  return (
    <div className='relative flex items-center flex-col min-h-screen pb-32 p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'>
      
      <header className='relative flex justify-center items-center flex-col mb-12 w-full sm:w-auto z-10'>
        <h1 className='text-4xl sm:text-5xl text-center text-gray-200 font-bold mb-8'>Buscador de Películas</h1>
        <div className="w-full sm:w-[500px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-transparent rounded-lg bg-blue-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-blue-200 dark:border-blue-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-2 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 shadow-sm transition-all duration-300"
              placeholder="Search movies..."
              value={search}
              onChange={handleChange}
            />
             <button
             onClick={handleSubmit}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-purple-600 dark:focus:ring-blue-800 shadow-md transition-all duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <main className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10'>
      {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}

export default App;
