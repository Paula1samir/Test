
import { Link } from 'react-router-dom';
const ProductCardApi = ({ name, description, price, quantity, image }) => {
  return (
    <div className="product-card" style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
      <img src={image} alt={name} className="product-img" />
      <p className="product-name" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>
        {name}
      </p>
      <p className="product-description" style={{ fontSize: '1rem', color: '#555', marginBottom: '10px' }}>
        {description}
      </p>
      <div className="details d-flex justify-content-center align-items-center"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Price:</p>
        <p className="product-price" style={{ margin: 0, fontSize: '1rem', color: '#007BFF' }}>${price}</p>
      </div>
      <p className="product-quantity" style={{ fontSize: '0.9rem', color: '#777' }}>Quantity: {quantity}</p>
      <Link to={`/ProductDetails/${encodeURIComponent(name)}`} className="btn btn-success">
        View Details
      </Link>
    </div>
  );
};
export default ProductCardApi;