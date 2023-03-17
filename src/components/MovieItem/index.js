import './index.css'
import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {movie} = props
  const {posterPath, title, id} = movie
  return (
    <Link to={`/movies/${id}`}>
      <li className="movie-list-item">
        <img src={posterPath} alt={title} className="movie-item-img" />
      </li>
    </Link>
  )
}

export default MovieItem
