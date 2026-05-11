import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './Catalog.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);
  const [filters, setFilters] = useState({
    category: '',
    baseType: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return items.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.baseType && product.base_type !== filters.baseType) return false;
      if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [items, filters]);

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({ category: '', baseType: '', minPrice: '', maxPrice: '' });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        
        <div className="catalog-content">
          <div className="catalog-header">
            <h1>Каталог ламп</h1>
            <span className="products-count">
              {filteredProducts.length} товаров
            </span>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Загрузка товаров...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={() => dispatch(fetchProducts())}>Повторить</button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>Товары не найдены</p>
              <p>Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;