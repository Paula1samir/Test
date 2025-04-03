import './header.css';
import logoWhite from '../images/logo-white.png';
// import person from '../images/icons8-person-30.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from 'react-router-dom';
import Icon from '@mui/material/Icon';

<Icon>star</Icon>;

function Header() {
  const location = useLocation();
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
        <a href="/">
        
        <img src={logoWhite} style={{width:'100%'}}></img>
        </a>
        <div className='lower-header-box1'>
          <div className="">
            <div className="tab-switch">
              {/* Link for Login */}
              <a
                href="/Login"
                className={`link ${location.pathname === '/Login' ? 'active' : ''}`}
              >
                <span className="material-icons-outlined">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#00000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>                  
                </span>
                Login
              </a>
              <p>/</p>
              {/* Link for Sign Up */}
              <a
                href="/Signup"
                className={`link ${location.pathname === '/Signup' ? 'active' : ''}`}
              >
                Sign Up
              </a>
            </div>
          </div>
          {/* <img src={person}></img> */}
        </div>
      </div></>
  )
};
export default Header;