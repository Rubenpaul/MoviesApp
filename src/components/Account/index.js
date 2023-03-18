import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')

    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }

  render() {
    const userName = localStorage.getItem('username')
    const passWord = localStorage.getItem('password')

    const maskedPassword = '*'.repeat(passWord.length)

    return (
      <>
        <div className="account-bg">
          <Header />
          <div className="account-container">
            <h1 className="account-heading">Account</h1>
            <hr className="horizontal-rule" />
            <div className="details-container">
              <p className="details-heading">Member ship </p>
              <div className="user-details-container">
                <p className="username">{userName}</p>
                <p className="password">Password : {maskedPassword}</p>
              </div>
            </div>
            <hr className="horizontal-rule" />
            <div className="details-container">
              <p className="details-heading">Plan details</p>
              <div className="user-status">
                <p className="premium-text">Premium </p>
                <p className="ultra-hd">Ultra HD</p>
              </div>
            </div>
            <hr className="horizontal-rule" />
            <div className="logout-btn-container">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Account
