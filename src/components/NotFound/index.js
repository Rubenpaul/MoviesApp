import './index.css'

const NotFound = props => {
  const onClickGoToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-description">
        we are sorry the page you requested could not be found <br /> Please go
        back to the homepage.
      </p>
      <button
        type="button"
        className="go-to-home-btn"
        onClick={onClickGoToHome}
      >
        Go to Home
      </button>
    </div>
  )
}
export default NotFound
