import  { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://backendexpressjsback.onrender.com/transaction/all');
        setTransactions(response.data.data); 
        renderPieChart(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const renderPieChart = (data) => {
    const types = {
      Annually: 0,
      Trimesterly: 0,
      Monthly: 0
    };

    data.forEach(transaction => {
      types[transaction.type]++;
    });

    const ctx = document.getElementById('transactionPieChart');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(types),
        datasets: [{
          label: 'Transaction Types',
          data: Object.values(types),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderWidth: 1
        }]
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Transaction List</h1>
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group">
            {transactions.map(transaction => (
              <li key={transaction._id} className="list-group-item">
                <div className="row">
                  <div className="col">
                    <strong>Date:</strong> {transaction.timestamp}
                  </div>
                  <div className="col">
                    <strong>Card Number:</strong>card ending with {transaction.cardNumber.toString().substring(12,16)}
                  </div>
                  <div className="col">
                    <strong>Total:</strong> {transaction.total} DT
                  </div>
                  <div className="col">
                    <strong>Type:</strong> {transaction.type} 
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <canvas id="transactionPieChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
