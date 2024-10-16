import React from 'react';
import '../styles/SortFilter.css';

const SortFilter = ({ categories, selectedCategory, onCategoryChange, onPriceRangeChange, onSort }) => {
  return (
    <div className="sort-filter">
    <div className="dropdown-container">
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        onChange={(e) => onCategoryChange(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="price-select">Price Range:</label>
      <select id="price-select" onChange={(e) => onPriceRangeChange(e.target.value)}>
        <option value="">All Prices</option>
        <option value="0-50">Under $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100-200">$100 - $200</option>
        <option value="200-">Over $200</option>
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Alphabetically</option>
      </select>
    </div>
  </div>
  );
};

export default SortFilter;