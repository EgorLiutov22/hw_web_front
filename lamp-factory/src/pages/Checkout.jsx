import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal, getDiscountAmount, getFinalTotal, getDeliveryCost } = useCart();
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    city: '',
    street: '',
    building: '',
    entrance: '',
    floor: '',
    apartment: '',
    delivery_method: 'pickup',
    payment_method: 'cash',
    comment: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customer_name.trim()) newErrors.customer_name = 'Введите имя';
    if (!formData.customer_phone.trim()) newErrors.customer_phone = 'Введите телефон';
    if (!formData.city.trim()) newErrors.city = 'Введите город';
    if (!formData.street.trim()) newErrors.street = 'Введите улицу';
    if (!formData.building.trim()) newErrors.building = 'Введите дом';
    
    if (formData.delivery_method === 'courier' && (!formData.apartment.trim())) {
      newErrors.apartment = 'Введите квартиру';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.length === 0) return;

    const orderId = Math.floor(100000 + Math.random() * 900000);
    
    clearCart();
    
    navigate(`/confirmation/${orderId}`);
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Оформление заказа</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Контактные данные</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Имя *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className={errors.customer_name ? 'error' : ''}
                />
                {errors.customer_name && <span className="error-msg">{errors.customer_name}</span>}
              </div>
              <div className="form-group">
                <label>Телефон *</label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className={errors.customer_phone ? 'error' : ''}
                />
                {errors.customer_phone && <span className="error-msg">{errors.customer_phone}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Адрес доставки</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Город *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-msg">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Улица *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={errors.street ? 'error' : ''}
                />
                {errors.street && <span className="error-msg">{errors.street}</span>}
              </div>
              <div className="form-group">
                <label>Дом *</label>
                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className={errors.building ? 'error' : ''}
                />
                {errors.building && <span className="error-msg">{errors.building}</span>}
              </div>
              <div className="form-group">
                <label>Подъезд</label>
                <input
                  type="text"
                  name="entrance"
                  value={formData.entrance}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Этаж</label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Квартира</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className={errors.apartment ? 'error' : ''}
                />
                {errors.apartment && <span className="error-msg">{errors.apartment}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Способ доставки</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="delivery_method"
                  value="pickup"
                  checked={formData.delivery_method === 'pickup'}
                  onChange={handleChange}
                />
                <span>Самовывоз (бесплатно)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="delivery_method"
                  value="courier"
                  checked={formData.delivery_method === 'courier'}
                  onChange={handleChange}
                />
                <span>Курьер (200 ₽, бесплатно от 1000 ₽)</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Способ оплаты</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="cash"
                  checked={formData.payment_method === 'cash'}
                  onChange={handleChange}
                />
                <span>Наличными при получении</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="card"
                  checked={formData.payment_method === 'card'}
                  onChange={handleChange}
                />
                <span>Картой онлайн</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Комментарий к заказу</h3>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Дополнительные пожелания к заказу"
              rows="4"
            />
          </div>

          <div className="order-summary">
            <h3>Итого к оплате</h3>
            <div className="summary-row">
              <span>Товары</span>
              <span>{getCartTotal().toFixed(2)} ₽</span>
            </div>
            <div className="summary-row">
              <span>Скидка</span>
              <span>-{getDiscountAmount().toFixed(2)} ₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка</span>
              <span>{getDeliveryCost() === 0 ? 'Бесплатно' : `${getDeliveryCost()} ₽`}</span>
            </div>
            <div className="summary-row total">
              <span>Итого</span>
              <span>{(getFinalTotal() + getDeliveryCost()).toFixed(2)} ₽</span>
            </div>
            <button type="submit" className="submit-btn">
              Подтвердить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
