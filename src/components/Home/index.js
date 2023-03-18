import './index.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import ReactSlick from '../ReactSlick'
import Header from '../Header'
import HomePoster from '../HomePoster'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    trendingApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
    trendingNowMovies: [],
    originals: [],
    poster: {},
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginals()
  }

  getTrendingMovies = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSubmitTrendingSuccess(fetchedData.results)
    } else {
      this.onSubmitTrendingFailure()
    }
  }

  onSubmitTrendingSuccess = data => {
    const updatedMoviesData = this.getUpdatedData(data)
    this.setState({
      trendingNowMovies: updatedMoviesData,
      trendingApiStatus: apiStatusConstants.success,
    })
  }

  getUpdatedData = data => {
    const updatedData = data.map(eachMovie => ({
      id: eachMovie.id,
      backdropPath: eachMovie.backdrop_path,
      overview: eachMovie.overview,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))

    return updatedData
  }

  onSubmitTrendingFailure = () => {
    this.setState({trendingApiStatus: apiStatusConstants.failure})
  }

  getOriginals = async () => {
    this.setState({originalsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSubmitOriginalsSuccess(fetchedData.results)
    } else {
      this.onSubmitOriginalsFailure()
    }
  }

  onSubmitOriginalsSuccess = data => {
    const updatedMoviesData = this.getUpdatedData(data)

    const index = Math.floor(Math.random() * updatedMoviesData.length)
    const HomePosterObj = updatedMoviesData[index]

    this.setState({
      originals: updatedMoviesData,
      originalsApiStatus: apiStatusConstants.success,
      poster: HomePosterObj,
    })
  }

  onSubmitOriginalsFailure = () => {
    this.setState({originalsApiStatus: apiStatusConstants.failure})
  }

  onClickRetryTrending = () => {
    this.getTrendingMovies()
  }

  onClickRetryOriginals = () => {
    this.getOriginals()
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingMoviesView = () => {
    const {trendingNowMovies} = this.state

    return <ReactSlick movies={trendingNowMovies} />
  }

  renderTrendingFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dio2gwquj/image/upload/v1679168604/Icon_home-failure_hb9h4i.png"
        alt="failure view"
        className="failure"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickRetryTrending}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingMoviesResult = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderTrendingMoviesView()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
      default:
        return null
    }
  }

  renderOriginalsMoviesView = () => {
    const {originals} = this.state

    return <ReactSlick movies={originals} />
  }

  renderOriginalsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dio2gwquj/image/upload/v1679168604/Icon_home-failure_hb9h4i.png"
        alt="failure view"
        className="failure"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickRetryOriginals}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsMoviesResult = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderOriginalsMoviesView()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()
      default:
        return null
    }
  }

  renderPosterResult = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderPoster()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()
      default:
        return null
    }
  }

  renderPoster = () => {
    const {poster} = this.state
    return <HomePoster posterDetails={poster} />
  }

  render() {
    return (
      <>
        <div className="movies-home-container">
          <Header />
          {this.renderPosterResult()}
          <h1 className="movie-status-heading">Trending Now</h1>
          {this.renderTrendingMoviesResult()}
          <h1 className="movie-status-heading">Originals</h1>
          {this.renderOriginalsMoviesResult()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
