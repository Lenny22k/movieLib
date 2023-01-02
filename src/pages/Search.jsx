import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MovieCard } from '../components/MovieCard'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

export function Search() {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])

  const query = searchParams.get('q')

  useEffect(() => {
    async function getSearchMovies(url) {
      const res = await fetch(url)
      const data = await res.json()
      setMovies(data.results)
    }

    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`
    getSearchMovies(searchWithQueryURL)
  }, [query])

  return (
    <div className="container">
      <h2 className="title">
        Resultado para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>carregando...</p>}
        {movies.length > 0 &&
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}
