import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './footer.css';
import logo from '../images/Layer_1.png';

function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories?limit=10000");
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer>
            <div className="footer">
                <div className="footer-contanier">
                    <div className="item">
                        <img src={logo} alt="not found" />
                        <h5>Customer Supports:</h5>
                        <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                        <a href="">info@kinbo.com</a>
                    </div>

                    <div className="item">
                        <h3>Categories</h3>
                        <ul>
                            {categories.map(category => (
                                <li key={category._id}>
                                    <Link to={`/categories?category=${category.name}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="item">
                        <h3>Quick links</h3>
                        <ul>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="mailto:admin@bulkify.com">Customer Help</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>

                    <div className="clear-fix"></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
