import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {

    
  const [products, setProducts] = useState([]);

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

  return (
    <> 
    <br />
    <br />
    <br />
    <button className='btn btn-success my-1 mx-5' onClick={handleClick}>become a seller</button>
    <div className="container py-4">
      <h2 className="mb-4">Featured Products</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100">
              <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                <img src={`http://localhost:3000/uploads/${product.filename}`} className="card-img-top" alt={product.productName} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <h6>${product.productPrice}</h6>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default ProductList;
