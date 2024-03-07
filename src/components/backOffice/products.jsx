import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

function ProductListBack() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('userToken');
  
        // Set headers with the token
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/market/get-products',{
          headers: headers,
        });
        // Filter out archived products
        const filteredProducts = response.data.filter(product => !product.archived);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAccept = async (productId) => {
    try {
      await axios.put(`http://localhost:3000/market/products/${productId}`, {
      headers: headers,  
      productAvailability: true });
      // Update the product's availability in the local state
      setProducts(products.map(product => {
        if (product._id === productId) {
          return { ...product, productAvailability: true };
        }
        return product;
      }));
    } catch (error) {
      console.error('Error updating product availability:', error);
    }
  };

  const handleReject = async (productId) => {
    try {
      // Send request to delete the product
      await axios.put(`http://localhost:3000/market/archiveProducts/${productId}`, { 
      headers: headers,  
      archived: true });
      
      // Remove the deleted product from the local state
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error archiving product:', error);
    }
  };
  
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
                <th>Status</th>
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
                  <td>{product.productPrice} TND</td>
                  <td>
                    {product.productAvailability === null ? 'Waiting...' : product.productAvailability ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}
                  </td>
                  <td>
  <button
    className="btn btn-success"
    onClick={() => handleAccept(product._id)}
    disabled={product.productAvailability === true}
    title={product.productAvailability ? "Product is already on market" : ""}
  >
    Accept
  </button>
  <button
    className="btn btn-danger"
    onClick={() => handleReject(product._id)}
    disabled={product.productAvailability === true}
    title={product.productAvailability ? "Product is already on market" : ""}
  >
    Delete
  </button>
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
