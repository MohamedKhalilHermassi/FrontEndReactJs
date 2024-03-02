import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductListBack() {

    
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
     <div>
      <h1>Product List</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${product.filename}`}
                    alt={product.productName}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>${product.productPrice}</td>
                <td>
                  <button className="btn btn-primary">Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
}

export default ProductListBack;
