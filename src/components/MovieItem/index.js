import './index.css'
import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {movie} = props
  const {posterPath, title, id} = movie
  return (
    <li className="movie-list-item">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-item-img" />
      </Link>
    </li>
  )
}

export default MovieItem
