import { useState, useEffect } from 'react';
import axios from 'axios';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders/get-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter out archived products
  

  return (
    <> 
      <br />
      <br />
      <br />  
      <div>
        <h1 className="ml-5">Orders List</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
               
                <th>Date</th>
                <th>email of buyer</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                 
                  <td>{new Date(order.date).toLocaleDateString()} AT {new Date(order.date).toLocaleTimeString()}</td>
                  <td>{order.user.email}</td>
                <td>{order.products.map((product)=>
                {
                    return <p key={product._id}>* {product.productName}</p>
                })}</td>
                <td>{order.totalPrice} TND</td>
                <td><button className="btn btn-primary">PDF</button>
                
                <button className="btn btn-secondary">EXCEL</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdersList;
