import './index.css'

const HomePoster = props => {
  const {posterDetails} = props
  const {backdropPath, title, overview} = posterDetails

  return (
    <div
      className="home-poster-container"
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="poster-details">
        <h1 className="poster-title">{title}</h1>
        <p className="overview">{overview}</p>
        <button type="button" className="play-btn">
          Play
        </button>
      </div>
      <div className="container">{}</div>
    </div>
  )
}

export default HomePoster
