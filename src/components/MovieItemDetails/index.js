import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Movie from '../Movie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSubmitSuccess(fetchedData.movie_details)
    } else {
      this.onSubmitFailure()
    }
  }

  onSubmitSuccess = data => {
    const updatedData = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      budget: data.budget,
      id: data.id,
      overview: data.overview,
      posterPath: data.poster_path,
      releaseDate: new Date(data.release_date),
      runtime: data.runtime,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      genres: data.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      })),
      spokenLanguages: this.getSpokenLanguages(data),
      similarMovies: this.getSimilarMovies(data),
    }

    this.setState({
      movieDetails: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getSpokenLanguages = data => {
    const spokenLanguages = data.spoken_languages.map(eachLanguage => ({
      id: eachLanguage.id,
      englishName: eachLanguage.english_name,
    }))

    return spokenLanguages
  }

  getSimilarMovies = data => {
    const similarMovies = data.similar_movies.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      backdropPath: eachMovie.backdrop_path,
      posterPath: eachMovie.poster_path,
    }))
    return similarMovies
  }

  onSubmitFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderLoaderView = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSearchFailureView = () => (
    <div className="search-no-results-container">
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/dio2gwquj/image/upload/v1678907879/Group_failuresearch_yctog3.png"
          alt="failure view"
          className="failure-view-img"
        />
        <p className="failure-movies-text">
          Something went wrong, Please try again.
        </p>
        <button
          type="button"
          className="try-again-btn"
          onClick={this.onClickRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  onClickRetry = () => {
    this.getMovieData()
  }

  renderMovieSuccess = () => {
    const {movieDetails} = this.state
    return <Movie movieDetails={movieDetails} />
  }

  renderMovieResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderMovieSuccess()
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderMovieResults()}</div>
  }
}

export default MovieItemDetails
