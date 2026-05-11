import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartPromoCode,
  removeFromCart,
  updateQuantity,
  applyPromoCode,
  selectCartTotal,
  selectDiscountAmount,
  selectFinalTotal,
  selectDeliveryCost,
  selectCartItemCount
} from '../store/cartSlice';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const promoCode = useSelector(selectCartPromoCode);
  const cartTotal = useSelector(selectCartTotal);
  const discountAmount = useSelector(selectDiscountAmount);
  const finalTotal = useSelector(selectFinalTotal);
  const deliveryCost = useSelector(selectDeliveryCost);
  const itemCount = useSelector(selectCartItemCount);
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const code = promoInput.toUpperCase();
    dispatch(applyPromoCode(code));
    if (code !== 'SALE10' && code !== 'SALE20') {
      setPromoError('Неверный промокод');
    } else {
      setPromoError('');
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
                    onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  {(item.price * item.quantity).toFixed(2)} ₽
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
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
                <span>Товары ({itemCount})</span>
                <span>{cartTotal.toFixed(2)} ₽</span>
              </div>
              {promoCode && (
                <div className="summary-row discount">
                  <span>Скидка ({promoCode})</span>
                  <span>-{discountAmount.toFixed(2)} ₽</span>
                </div>
              )}
              <div className="summary-row">
                <span>Доставка</span>
                <span>
                  {deliveryCost === 0 
                    ? 'Бесплатно' 
                    : `${deliveryCost} ₽`}
                </span>
              </div>
              {cartTotal < 1000 && (
                <div className="delivery-info">
                  До бесплатной доставки осталось: {(1000 - cartTotal).toFixed(2)} ₽
                </div>
              )}
              <div className="summary-row total">
                <span>Итого</span>
                <span>{(finalTotal + deliveryCost).toFixed(2)} ₽</span>
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

export default Cart;