import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>LampFactory</h4>
          <p>Интернет-магазин лампочек с доставкой по всей России</p>
        </div>
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Email: info@lampfactory.ru</p>
        </div>
        <div className="footer-section">
          <h4>Информация</h4>
          <p>Доставка</p>
          <p>Возврат</p>
          <p>Оплата</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 LampFactory. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
