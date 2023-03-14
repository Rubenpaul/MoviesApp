import './index.css'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-bg">
          <Header />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
