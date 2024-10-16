import React, { useEffect, useState, useContext } from 'react';
import { useParams,Link  } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

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
    <div className="product-detail">
            <ToastContainer />
      <div className='back-arrow'>
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" /><span style={{color:'blue',textDecoration:'none'}}>Back to Products</span></Link></div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={350}  height={350}/>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;