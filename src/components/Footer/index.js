import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <ul className="footer-items-list">
      <li className="footer-item">
        <button type="button" className="button">
          <FaGoogle size={16} />
        </button>
      </li>
      <li className="footer-item">
        <button type="button" className="button">
          <FaTwitter size={16} />
        </button>
      </li>
      <li className="footer-item">
        <button type="button" className="button">
          <FaInstagram size={16} />
        </button>
      </li>
      <li className="footer-item">
        <button type="button" className="button">
          <FaYoutube size={16} />
        </button>
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
