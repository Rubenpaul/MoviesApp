import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import MovieItem from '../MovieItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchApiStatus: apiStatusConstants.initial,
    searchVideos: [],
  }

  onClickRetry = () => {
    this.getSearchVideos()
  }

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

  renderLoaderView = () => (
    <div className="search-loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderNoVideosView = () => {
    const {searchInput} = this.state
    return (
      <div className="search-no-results-container">
        <div className="no-results">
          <img
            src="https://res.cloudinary.com/dio2gwquj/image/upload/v1678909196/Layer_2_no-videos_ce3ppo.png"
            alt="no movies"
            className="no-search-videos-img"
          />
          <p className="no-search-text">
            Your search for {searchInput} <br />
            did not find any matches.
          </p>
        </div>
      </div>
    )
  }

  renderSearchMovies = () => {
    const {searchVideos} = this.state

    return (
      <ul className="search-movies-list">
        {searchVideos.map(eachSearch => (
          <MovieItem movie={eachSearch} key={eachSearch.id} />
        ))}
      </ul>
    )
  }

  renderSearchSuccessView = () => {
    const {searchVideos} = this.state
    const moviesLength = searchVideos.length

    return moviesLength === 0
      ? this.renderNoVideosView()
      : this.renderSearchMovies()
  }

  renderSearchResults = () => {
    const {searchApiStatus} = this.state

    switch (searchApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSearchSuccessView()
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      default:
        return null
    }
  }

  renderInitialView = () => <div className="initial-view">{}</div>

  search = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getSearchVideos)
    }
  }

  getSearchVideos = async () => {
    this.setState({searchApiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
      searchApiStatus: apiStatusConstants.success,
      searchVideos: updatedData,
    })
  }

  onSubmitSearchFailure = () =>
    this.setState({searchApiStatus: apiStatusConstants.failure})

  render() {
    const {searchInput} = this.state
    return (
      <div className="bg-container">
        <Header
          search={this.search}
          searchInput={searchInput}
          getSearchVideos={this.getSearchVideos}
        />

        {searchInput === ''
          ? this.renderInitialView()
          : this.renderSearchResults()}
      </div>
    )
  }
}

export default Search
