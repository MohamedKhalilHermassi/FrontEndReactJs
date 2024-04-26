import axios from "axios";
import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('id');

  // Set headers with the token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://backendexpressjsback.onrender.com/orders/get-my-orders/${userId}`, {
          headers: headers,
        });
        // Filter out archived products
        const orders = response.data;
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <>
        <br />
        <h1 className="text-center ">You haven't made any orders yet</h1>
        <br />
        <br />

        <br />
        <br />
        </>
) : (
        <div className="table-responsive" id="orderDetails">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Products</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.date).toLocaleDateString()} AT {new Date(order.date).toLocaleTimeString()}</td>
                  <td>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product) => (
                          <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productPrice} TND</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>{order.totalPrice} TND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
