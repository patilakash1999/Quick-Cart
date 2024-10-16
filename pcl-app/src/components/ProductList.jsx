import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SortFilter from './SortFilter';
import SearchBar from './SearchBar';
import '../styles/ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart,getTotalCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearch = (searchTerm) => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, priceRange);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    filterProducts(selectedCategory, range);
  };

  const filterProducts = (category, priceRange) => {
    let results = products;

    if (category) {
      results = results.filter(product => product.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      results = results.filter(product => product.price >= min && (max ? product.price <= max : true));
    }

    setFilteredProducts(results);
    handleSort(sortOption, results); // Reapply sorting
  };

  const handleSort = (sortOption, productsToSort = filteredProducts) => {
    let sortedProducts = [...productsToSort];

    switch (sortOption) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };


  const handleAddToCart = (product) => {
    addToCart(product, 1); 
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  return (
    <div className="product-list">
      <ToastContainer />
      <h1>Fake Store</h1>
       
      <div className="search-container">
                <SearchBar onSearch={handleSearch} />
                <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    {getTotalCount() > 0 && ( 
                        <span className="cart-count">{getTotalCount()}</span>
                    )}
                </Link>
            </div>
      <SortFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onSort={handleSort}
      />
      <div className="grid-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title}/> </Link>
              <h6>{product.title}</h6>
              
              <p>${product.price}</p>
           
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
