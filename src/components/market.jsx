import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false); // State to manage cart dropdown visibility
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/market');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/market/get-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      setTotalPrice(totalPrice + product.productPrice);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setTotalPrice(totalPrice + product.productPrice);
      setTotalItems(cartItems.reduce((total, item) => total + item.quantity, 0) + 1); // Update total items count

    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const filteredProducts = products.filter(product => product.productAvailability === true && !product.archived);

  return (
    <> <br />
    <br />
    <br />

      <div className="container py-4">
      <button className='btn btn-success my-1 mx-5' onClick={handleClick}>Become a seller</button>

        <h2 className="mb-4">Featured Products</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="col">
              <div className="card h-100">
                <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                  <img src={`http://localhost:3000/uploads/${product.filename}`} className="card-img-top" alt={product.productName} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.productDescription}</p>
                  <h6>{product.productPrice} TND</h6>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating cart icon */}
      <div style={floatingCartStyle} onClick={toggleCart}>
        <FaShoppingCart />
        <span style={cartCountStyle}>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      </div>
      {/* Cart dropdown */}
      {showCart && (
        <div style={cartDropdownStyle}>
          <h4>Shopping Cart</h4>
          <div style={cartListStyle}>
            <ul>
              {cartItems.map(item => (
                <li key={item._id}>
                  <div>
                    <img src={`http://localhost:3000/uploads/${item.filename}`} alt={item.productName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <span>{item.productName} - {item.productPrice} TND - Quantity: {item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p>Total Price: {totalPrice} TND</p>
        </div>
      )}
    </>
  );
}

export default ProductList;

// CSS styles
const floatingCartStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const cartCountStyle = {
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  backgroundColor: 'red',
  color: '#fff',
  padding: '5px 8px',
  borderRadius: '50%',
};

const cartDropdownStyle = {
  position: 'fixed',
  bottom: '100px',
  right: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  maxHeight: '300px', // Set maximum height for cart dropdown
  overflowY: 'auto', // Enable vertical scrolling
};

const cartListStyle = {
  maxHeight: '240px', // Set maximum height for the list of products
  overflowY: 'auto', // Enable vertical scrolling within the list
};
