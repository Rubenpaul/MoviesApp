import './index.css'
import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMovies: []}

  componentDidMount() {
    this.getPopularVideos()
  }

  getPopularVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSearchSuccess(data)
    } else {
      this.onSubmitSearchFailure()
    }
  }

  onSubmitSearchSuccess = data => {
    const updatedData = data.results.map(eachSearch => ({
      id: eachSearch.id,
      backdropPath: eachSearch.backdrop_path,
      posterPath: eachSearch.poster_path,
      title: eachSearch.title,
    }))

    this.setState({
      apiStatus: apiStatusConstants.success,
      popularMovies: updatedData,
    })
  }

  onSubmitSearchFailure = () =>
    this.setState({apiStatus: apiStatusConstants.failure})

  onClickRetry = () => {
    this.getPopularVideos()
  }

  renderLoaderView = () => (
    <div className="search-loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularMoviesSuccess = () => {
    const {popularMovies} = this.state

    return (
      <ul className="popular-movies-list">
        {popularMovies.map(eachMovie => (
          <MovieItem movie={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )
  }

  renderPopularMoviesFailure = () => (
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

  renderPopularMoviesResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderPopularMoviesSuccess()
      case apiStatusConstants.failure:
        return this.renderPopularMoviesFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-container">
        <Header />
        {this.renderPopularMoviesResult()}
        <Footer />
      </div>
    )
  }
}

export default Popular
