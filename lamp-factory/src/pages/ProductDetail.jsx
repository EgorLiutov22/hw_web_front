import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/')}>Вернуться в каталог</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад к каталогу
        </button>
        
        <div className="product-detail">
          <div className="product-image-section">
            <div className="product-image-large">
              <img src={product.image_url} alt={product.name} />
            </div>
          </div>
          
          <div className="product-info-section">
            <span className="product-sku">Артикул: {product.sku}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-params">
              <div className="param">
                <span className="param-label">Категория:</span>
                <span className="param-value">{product.category}</span>
              </div>
              <div className="param">
                <span className="param-label">Тип цоколя:</span>
                <span className="param-value">{product.base_type}</span>
              </div>
              <div className="param">
                <span className="param-label">Мощность:</span>
                <span className="param-value">{product.power} W</span>
              </div>
              <div className="param">
                <span className="param-label">Наличие:</span>
                <span className="param-value in-stock">
                  {product.stock_quantity > 0 ? `В наличии (${product.stock_quantity} шт.)` : 'Нет в наличии'}
                </span>
              </div>
            </div>
            
            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-price-section">
              <span className="product-price">{product.price} ₽</span>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
