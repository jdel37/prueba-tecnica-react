

function ListOfMovies ({ movies }) {
    return (
     <>
        {
          movies.map(movie => (
            <li className={'flex flex-col items-center p-6 bg-indigo-700 rounded-lg shadow-lg transition-transform duration-500   hover:transform hover:scale-105'} >
              <h3 className='text-2xl sm:text-3xl text-center text-gray-100 font-semibold mb-2'>{movie.title}</h3>
              <p className='text-lg sm:text-xl text-center text-gray-200 mb-4'>{movie.year}</p>
              <img src={movie.image} alt={movie.title} className='max-h-80 rounded-lg shadow-md' />
            </li>
          ))
        }
    </>
    )
  }
  
  function NoMoviesResults () {
    return (
      
        <p className='text-lg sm:text-xl text-center text-gray-200 mb-4' >No se encontraron películas para esta búsqueda</p>
      
      
    )
  }
  
  export function Movies ({ movies }) {
    const hasMovies = movies?.length > 0
  
    return (
      hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
  }