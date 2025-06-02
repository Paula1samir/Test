import './header.css';
import logoWhite from '../images/logo-white.png';
// import person from '../images/icons8-person-30.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mui/material/Icon';

<Icon>star</Icon>;

function Header() {
  const location = useLocation();
  const CustomerToken = localStorage.getItem("CustomerToken");
  const SupplierToken = localStorage.getItem("SupplierToken");
  const AdminToken = localStorage.getItem("AdminToken");
  const Admin = JSON.parse(localStorage.getItem("Admin") || '{}');
  const Supplier = JSON.parse(localStorage.getItem("supplier") || '{}');
  const Customer = JSON.parse(localStorage.getItem("Customer") || '{}');
  // const suppiler = JSON.parse(localStorage.getItem("supplier") || '{}');
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
        <a href="/"  className='logo' >

          <img src={logoWhite} style={{ width: '100%'  }}></img>
        </a>
        <div className='lower-header-box1'>
          <div className="">
            {!CustomerToken && !SupplierToken && !AdminToken && (
              <div className="tab-switch">
                <a 
                style={{fontSize:'20px', color:"#ffffff !important", paddingRight:"5px"}} 
                  href="/Login"
                  className={`link ${location.pathname === '/Login' ? 'active' : ''}`}
                >
                  <span className="material-icons-outlined">
                  </span>
                  Login
                </a>
                <strong>|</strong>
                <a
                style={{fontSize:'20px', color:"#ffffff !important" ,paddingLeft:"5px"}} 
                  href="/Signup"
                  className={`link ${location.pathname === '/Signup' ? 'active' : ''}`}
                >
                  Sign Up
                </a>
              </div>
            )}
            {CustomerToken && (
              <Link  to="/CustomerProfile" className={`link ${location.pathname === '/CustomerProfile' ? 'active' : ''}`}>
              {Customer.fullName}    Dashboard 
              </Link>
            )}
            {SupplierToken  && (
              <Link   to="/SuppDashboard" className={`link ${location.pathname === '/SuppDashboard' ? 'active' : ''}`}>
              {Supplier.fullName}    Dashboard 
              </Link>
            )}
            {
              AdminToken && (
                <Link   to="/AdminDashboard" className={` link${location.pathname === '/AdminDashboard' ? 'active' : ''}`}>
                {Admin.fullName}  Dashboard 
                </Link>
              )}
            
          </div>
        </div>
      </div></>
  )
};
export default Header;