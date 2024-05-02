import { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as XLSX from 'xlsx';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState('latest');
 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get('https://backendexpressjs-2.onrender.com/orders/get-orders', {
          headers: headers,
        });

        const sortedOrders = orderBy === 'latest' ? response.data : response.data.slice().reverse();

        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [orderBy]);

  const generatePDF = async (order) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 15;

    page.drawText('Order Details', {
      x: 50,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    });

    page.drawText(`Date: ${new Date(order.date).toLocaleString()}`, {
      x: 50,
      y: height - 70,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    });

    page.drawText(`Buyer Email: ${order.user.email}`, {
      x: 50,
      y: height - 90,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    });

    let yOffset = height - 120;

    order.products.forEach((product, index) => {
      page.drawText(`${index + 1}. ${product.productName}  - $${product.productPrice.toFixed(2)}`, {
        x: 50,
        y: yOffset,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      yOffset -= 20;
    });

    page.drawText(`Total Price: $${order.totalPrice.toFixed(2)}`, {
      x: 50,
      y: yOffset,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  const generateExcel = (order) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([order]);
    XLSX.utils.book_append_sheet(wb, ws, 'Order');
    XLSX.writeFile(wb, `order_${order._id}.xlsx`);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <div>
        <h1 className="ml-5">Orders List</h1>
        <div className="table-responsive" id="orderDetails">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Email of Buyer</th>
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
                  <td>
                    <button className="btn btn-primary" onClick={() => generatePDF(order)}>PDF</button>
                    <button className="btn btn-secondary" onClick={() => generateExcel(order)}>EXCEL</button>
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

export default OrdersList;
