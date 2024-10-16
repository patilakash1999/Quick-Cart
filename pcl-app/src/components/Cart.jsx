import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { useParams,Link  } from 'react-router-dom';
import '../styles/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="cart">
      <div className='back-arrow'>
      <Link to="/"><FontAwesomeIcon icon={faHome} className="arrow-icon" /><span style={{color:'blue',textDecoration:'none'}}>Back to Products</span></Link></div>
     
      <h1>Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">Your cart is empty.</div>
      ) : (
        <div className="cart-table">
          <div className="cart-header">
            <div className="header-item product">Product</div>
            <div className="header-item price">Price</div>
            <div className="header-item quantity">Quantity</div>
            <div className="header-item total-price">Total Price</div>
            <div className="header-item action"></div>
          </div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="product-info">
                <img src={item.image} alt={item.title} />
                <div>
                  <h5>{item.title}</h5>
                 
                </div>
              </div>
              <div className="item-price">${item.price.toFixed(2)}</div>
              <div className="item-quantity">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          {cart.length > 0 && (
            <h2 className="overall-total">
              Overall Total: $
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;