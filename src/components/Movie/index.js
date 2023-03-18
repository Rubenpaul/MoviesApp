import './index.css'

import Header from '../Header'
import Footer from '../Footer'

const Movie = props => {
  const {movieDetails} = props
  const {
    adult,
    backdropPath,
    budget,
    id,
    overview,
    posterPath,
    releaseDate,
    runtime,
    title,
    voteAverage,
    voteCount,
    genres,
    spokenLanguages,
    similarMovies,
  } = movieDetails

  const hours = Math.floor((runtime * 1) / 60)
  const minutes = runtime % 60

  const month = releaseDate.getMonth() + 1

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const date = releaseDate.getDate()
  const year = releaseDate.getFullYear()

  const censorText = adult ? 'A' : 'U/A'

  return (
    <div className="similar-bg">
      <div
        className="movie-success-container"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div>
          <div className="movie-details">
            <h1 className="poster-title">{title}</h1>
            <div className="movie-release-details">
              <p className="movie-runtime">
                {hours}h {minutes}m
              </p>
              <p className="movie-censor-status">{censorText}</p>
              <p className="movie-release-date">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
          <div className="container">{}</div>
        </div>
      </div>
      <div className="movie-more-details-container">
        <div className="category">
          <h1 className="category-heading">Genres</h1>
          <ul className="list">
            {genres.map(eachGenre => (
              <li key={eachGenre.id} className="list-item">
                <p className="para">{eachGenre.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="category">
          <h1 className="category-heading">Audio Available</h1>
          <ul className="list">
            {spokenLanguages.map(eachLanguage => (
              <li key={eachLanguage.id} className="list-item">
                <p className="para">{eachLanguage.englishName}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="category">
          <h1 className="category-heading">Rating Count</h1>
          <p className="para">{voteCount}</p>
          <h1 className="category-heading">Rating Average</h1>
          <p className="para">{voteAverage}</p>
        </div>
        <div className="category">
          <h1 className="category-heading">Budget</h1>
          <p className="para">{budget}</p>
          <h1 className="category-heading">Release Date</h1>
          <p className="para">
            {date}th {months[month - 1]} {year}
          </p>
        </div>
      </div>
      <div className="similar-movies-like-container">
        <h1 className="more-like-this-heading">More like this </h1>
        <ul className="similar-movies">
          {similarMovies.map(eachMovie => (
            <li key={eachMovie.id} className="similar-item">
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="movie-img"
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Movie
