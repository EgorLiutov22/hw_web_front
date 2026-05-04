import { useParams, Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Заказ успешно оформлен!</h1>
        <p className="order-number">Номер заказа: #{orderId}</p>
        <p className="success-message">
          Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
        </p>
        
        <div className="confirmation-details">
          <div className="detail-card">
            <h4>📞 Контактная информация</h4>
            <p>Менеджер свяжется с вами по указанному телефону</p>
          </div>
          <div className="detail-card">
            <h4>📦 Доставка</h4>
            <p>Информация о доставке будет отправлена на email</p>
          </div>
          <div className="detail-card">
            <h4>💳 Оплата</h4>
            <p>Оплата при получении или онлайн</p>
          </div>
        </div>
        
        <Link to="/" className="home-btn">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
