import { useState, useEffect } from 'react'
import { MovieCard } from '../components/MovieCard'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

export function Home() {
  const [topMovies, setTopMovies] = useState([])

  useEffect(() => {
    async function getTopRatedMovies(url) {
      const res = await fetch(url)
      const data = await res.json()
      setTopMovies(data.results)
    }

    const topRaredUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`
    getTopRatedMovies(topRaredUrl)
  }, [])

  return (
    <div>
      <div className="container">
        <h2 className="title">Melhores filmes:</h2>
        <div className="movies-container">
          {topMovies.length === 0 && <p>Carregando...</p>}
          {topMovies.length > 0 && topMovies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
      </div>
    </div>
  )
}
