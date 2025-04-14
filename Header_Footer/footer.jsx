import './footer.css';
import logo from '../images/Layer_1.png';
function Footer() {
    return (
        <>
            <footer>
      <div className="footer">
        <div className="contanier">
          <div className="item">
            <img src={logo} alt="not found" />
            <h5>Customer Supports:</h5>
            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <a href="">info@kinbo.com</a>
          </div>

          <div className="item">
            <h3>Top Category</h3>
            <ul>
              <li>Electronics</li>
              <h3>Accessories</h3>
              <li>Cosmetcs</li>
              <li>food</li>
            </ul>
          </div>

          <div className="item">
            <h3>Quick links</h3>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Customer Help</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          <div className="clear-fix"></div>
        </div>
      </div>
    </footer>
        </>
    );
}

export default Footer;
