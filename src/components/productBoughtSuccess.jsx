import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ProductSuccess() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('payment_id');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('id');
    const bookId = localStorage.getItem('bookId');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/payement/verify/${paymentId}`)
            .then((result) => {
                console.log(result.data);
                if (result.data.result.status === "SUCCESS") {

      const response =  axios.post('http://localhost:3000/orders/add-order', {
        totalPrice: localStorage.getItem('totalPrice'),
        user: localStorage.getItem('id'),
        products: localStorage.getItem('products'),
      });
      setSuccess(true);



                }
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false)); 
    }, []);

    return (
        <>
            {loading ? (
                <div style={{ marginTop: '150px', textAlign: 'center', height: '1000px',padding: '20px' }}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            ) : success ? (
                <div style={{ marginTop: '50px', height: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #ccc', borderRadius: '8px', padding: '20px' }}>
                    <img width="100" height="100" src="https://img.icons8.com/bubbles/100/add-shopping-cart.png" alt="add-shopping-cart"/>
                    <div className='mt-3'>Your order has been placed successfully!</div>
                    
                   

                </div>
            ) : (
                <div style={{ marginTop: '50px', textAlign: 'center' }}>Payment verification failed.</div>
            )}
        </>
    );
}

export default ProductSuccess;
