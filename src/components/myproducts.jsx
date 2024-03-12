import axios from "axios";
import { useEffect, useState } from "react";

function MyProducts()
{
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
            const response = await axios.get(`http://localhost:3000/market/user/${userId}/products`,{
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
      <>

<br />
<br />
<br />
<table className="table table-bordered table-hover">
  <thead className="bg-primary text-green">
    <tr>
    <th scope="col">Photo</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Description</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Availability</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product._id}>
        <td><img
          src={`http://localhost:3000/uploads/${product.filename}`}
          alt={product.productName}
          style={{ width: '100px', height: 'auto' }}
        /></td>
        <td>{product.productName}</td>
        <td>{product.productDescription}</td>
        <td>${product.productPrice.toFixed(2)}</td>
        <td>{product.productType}</td>
        <td>
          <span className={`badge ${product.productAvailability ? 'bg-success' : 'bg-danger'}`}>
            {product.productAvailability ? 'Available' : 'Not Available'}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>



      </>

    )
}export default MyProducts;