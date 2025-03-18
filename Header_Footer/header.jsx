import './header.css';
import logoWhite from '../images/logo-white.png';
// import person from '../images/icons8-person-30.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <>
      <div className="upper-header">
        <h5>Welcome to bulkify online Community Purchase.</h5>
        <div className='theCard'>
          <p className='card-header'>Follow us on :</p>
          <div className="social-media d-flex justify-content-center align-items-center">
            <a href="#" className="social-link" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>


      </div>
      <hr></hr>
      <div className="lower-header">
        <img src={logoWhite}></img>
        <div className='lower-header-box'>
          {/* <img src={person}></img> */}
        </div>
      </div></>
  )
};
export default Header;