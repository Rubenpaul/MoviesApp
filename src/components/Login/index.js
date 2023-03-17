import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure(data)
    }
  }

  onSubmitSuccess = data => {
    const {history} = this.props
    const {username, password} = this.state

    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 7})

    history.replace('/')

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = data => {
    this.setState({errMsg: data.error_msg})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="credentials-container">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input"
          value={username}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="credentials-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {errMsg} = this.state
    const accessToken = Cookies.get('jwt_token')

    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dio2gwquj/image/upload/v1678711969/Group_7399_movies_logo_hvsrde.png"
          alt="login website logo"
          className="website-logo"
        />
        <div className="login-container">
          <div className="container">
            <h1 className="form-heading">Login</h1>
            <form onSubmit={this.onSubmitForm} className="form">
              {this.renderUsernameField()}
              {this.renderPasswordField()}
              <p className="error-msg">{errMsg}</p>
              <button type="submit" className="sign-in-btn">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
