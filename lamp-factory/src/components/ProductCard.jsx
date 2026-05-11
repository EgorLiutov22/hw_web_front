import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-base">{product.base_type}</span>
          <span className="product-power">{product.power}W</span>
        </div>
        <div className="product-footer">
          <span className="product-price">{product.price} ₽</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;