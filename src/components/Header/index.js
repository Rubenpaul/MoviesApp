import './index.css'
import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

class Header extends Component {
  state = {showMenu: false, searchInput: ''}

  onClickSearchBtn = () => {
    const {search, location} = this.props
    const {searchInput} = this.state

    if (location.pathname === '/search' && searchInput !== '') {
      search(searchInput)
    }
  }

  onClickHamburgerMenu = () => {
    this.setState({showMenu: true})
  }

  onClickCloseBtn = () => {
    this.setState({showMenu: false})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearch = event => {
    const {search} = this.props
    if (event.target.value !== '' && event.key === 'Enter') {
      search(event.target.value)
    }
  }

  render() {
    const {showMenu, searchInput} = this.state
    const {location} = this.props

    const toggleSearchInput = location.pathname === '/search'

    const searchContainerStyle = toggleSearchInput
      ? 'search-container'
      : 'new-search-container'

    const searchBtnContainerStyle = toggleSearchInput
      ? 'search-btn-container'
      : 'new-search-btn-container'

    return (
      <div className="header">
        <nav className="nav">
          <div className="nav-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dio2gwquj/image/upload/v1678711969/Group_7399_movies_logo_hvsrde.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>

            <div className="nav-items-container">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/popular" className="nav-link">
                    Popular
                  </Link>
                </li>
              </ul>

              <div className="nav-details-container">
                <div className={searchContainerStyle}>
                  {toggleSearchInput && (
                    <input
                      type="search"
                      className="search-input"
                      onChange={this.onChangeInput}
                      value={searchInput}
                      onKeyDown={this.onKeyDownSearch}
                    />
                  )}
                  <div className={searchBtnContainerStyle}>
                    <Link to="/search">
                      <button
                        type="button"
                        className="search-btn"
                        onClick={this.onClickSearchBtn}
                        testid="searchButton"
                      >
                        <HiOutlineSearch size={24} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="profile-btn-container">
                  <Link to="/account" className="profile-link">
                    <button type="button" className="profile-btn">
                      <img
                        src="https://res.cloudinary.com/dio2gwquj/image/upload/v1678799136/Mask_Group_account-icon_bdjfsb.png"
                        alt="profile"
                      />
                    </button>
                  </Link>
                </div>

                <button
                  type="button"
                  className="hamburger-btn"
                  onClick={this.onClickHamburgerMenu}
                >
                  <GiHamburgerMenu size={24} />
                </button>
              </div>
            </div>
          </div>
        </nav>
        {showMenu && (
          <div className="menu">
            <ul className="menu-items">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/popular" className="menu-link">
                  Popular
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/account" className="menu-link">
                  Account
                </Link>
              </li>
            </ul>

            <button
              type="button"
              className="close-btn"
              onClick={this.onClickCloseBtn}
            >
              <AiFillCloseCircle size={18} />
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
