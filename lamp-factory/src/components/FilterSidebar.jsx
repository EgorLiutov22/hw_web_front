import { categories, baseTypes } from '../data/mockProducts';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleCategoryChange = (category) => {
    onFilterChange('category', category === 'Все' ? '' : category);
  };

  const handleBaseTypeChange = (baseType) => {
    onFilterChange('baseType', baseType === 'Все' ? '' : baseType);
  };

  const handlePriceChange = (type, value) => {
    onFilterChange(type === 'min' ? 'minPrice' : 'maxPrice', value);
  };

  return (
    <aside className="filter-sidebar">
      <h3 className="filter-title">Фильтры</h3>
      
      <div className="filter-section">
        <h4 className="filter-section-title">Категория</h4>
        <div className="filter-options">
          {categories.map(category => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === category || (category === 'Все' && !filters.category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Тип цоколя</h4>
        <div className="filter-options">
          {baseTypes.map(baseType => (
            <label key={baseType} className="filter-option">
              <input
                type="radio"
                name="baseType"
                checked={filters.baseType === baseType || (baseType === 'Все' && !filters.baseType)}
                onChange={() => handleBaseTypeChange(baseType)}
              />
              {baseType}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">Цена, ₽</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="От"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="price-input"
          />
          <span className="price-separator">—</span>
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      <button 
        className="clear-filters-btn"
        onClick={() => onFilterChange('clear', {})}
      >
        Сбросить фильтры
      </button>
    </aside>
  );
};

export default FilterSidebar;
