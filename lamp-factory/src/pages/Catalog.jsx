import { useState, useMemo } from 'react';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './Catalog.css';

const Catalog = () => {
  const [filters, setFilters] = useState({
    category: '',
    baseType: '',
    minPrice: '',
    maxPrice: ''
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.baseType && product.base_type !== filters.baseType) return false;
      if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

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
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>Товары не найдены</p>
                <p>Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
