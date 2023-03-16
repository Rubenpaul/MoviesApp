import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {movies} = this.props
    return (
      <Slider {...settings}>
        {movies.map(eachMovie => {
          const {id, posterPath, title} = eachMovie
          return (
            <li className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="slick-img" src={posterPath} alt={title} />
              </Link>
            </li>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="slick-container">
        <ul className="slick-slider">{this.renderSlider()}</ul>
      </div>
    )
  }
}

export default ReactSlick
