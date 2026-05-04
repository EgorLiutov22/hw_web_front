import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    promoCode,
    applyPromoCode,
    getCartTotal,
    getDiscountAmount,
    getFinalTotal,
    getFreeDeliveryThreshold,
    getDeliveryCost
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const success = applyPromoCode(promoInput.toUpperCase());
    if (success) {
      setPromoError('');
    } else {
      setPromoError('Неверный промокод');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h2>Корзина пуста</h2>
            <p>Добавьте товары из каталога</p>
            <Link to="/" className="go-catalog-btn">Перейти в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Корзина</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image_url} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-sku">Артикул: {item.sku}</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  {(item.price * item.quantity).toFixed(2)} ₽
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Итого</h3>
            
            <div className="promo-section">
              <input
                type="text"
                placeholder="Промокод"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="promo-input"
              />
              <button onClick={handleApplyPromo} className="promo-btn">
                Применить
              </button>
              {promoError && <span className="promo-error">{promoError}</span>}
              {promoCode && <span className="promo-success">Промокод применён!</span>}
            </div>
            
            <div className="summary-rows">
              <div className="summary-row">
                <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{getCartTotal().toFixed(2)} ₽</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Скидка ({promoCode})</span>
                  <span>-{getDiscountAmount().toFixed(2)} ₽</span>
                </div>
              )}
              <div className="summary-row">
                <span>Доставка</span>
                <span>
                  {getDeliveryCost() === 0 
                    ? 'Бесплатно' 
                    : `${getDeliveryCost()} ₽`}
                </span>
              </div>
              {getCartTotal() < getFreeDeliveryThreshold() && (
                <div className="delivery-info">
                  До бесплатной доставки осталось: {getFreeDeliveryThreshold() - getCartTotal()} ₽
                </div>
              )}
              <div className="summary-row total">
                <span>Итого</span>
                <span>{(getFinalTotal() + getDeliveryCost()).toFixed(2)} ₽</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="checkout-btn"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';

export default Cart;
