import axios from "axios";
import { useEffect, useState } from "react";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('id');

  // Set headers with the token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/market/user/${userId}/products`, {
          headers: headers,
        });
        // Filter out archived products
        const products = response.data;
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (

    <div style={{ height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Center content vertically and horizontally */}
      <div className="container mt-4">
        <h2 className="mb-4">My Products</h2>
        {products.length === 0 ? (
              <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Center content vertically and horizontally */}
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/accordion.png" alt="accordion"/>
        <p>Sorry, you haven't posted any products to the marketplace yet.</p>
      </div>
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 mb-4">
                <br />
                <div className="card h-100">
                  <img
                    src={`http://localhost:3000/uploads/${product.filename}`}
                    alt={product.productName}
                    className="card-img-top"
                    style={{ width: '100%', height: '450px', objectFit: 'cover' }} // Set fixed dimensions
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription.substring(0, 80)}</p>
                    <p className="card-text"><strong>Price:</strong> {product.productPrice.toFixed(2)} TND</p>
                    <p className="card-text"><strong>Category:</strong> {product.productType}</p>
                    <p className="card-text"><strong>Availability:</strong> <span className={`badge ${product.productAvailability ? 'bg-success' : 'bg-danger'}`}>
                      {product.productAvailability ? 'Available' : 'Not Available'}
                    </span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default MyProducts;
