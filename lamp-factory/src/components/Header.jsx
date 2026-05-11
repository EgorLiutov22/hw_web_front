import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/cartSlice';
import './Header.css';

const Header = () => {
  const itemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">💡</span>
          <span className="logo-text">LampFactory</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Каталог</Link>
          <Link to="/cart" className="nav-link">Корзина</Link>
        </nav>

        <Link to="/cart" className="cart-button">
          <span className="cart-icon">🛒</span>
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;