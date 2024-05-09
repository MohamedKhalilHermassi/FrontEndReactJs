import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function bookSuccess() {
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


                    try {
                         axios.put(`http://localhost:3000/book/buy-book/${bookId}/${userId}`);
                         setSuccess(true);
                      } catch (error) {
                        console.error('Error buying book:', error);
                        alert('Failed to buy book. Please try again.');
                      }


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
                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/book.png" alt="book"/>
                    <div className='mt-3'>Your have purchased the book successfully!</div>
                    
                    <div className='mt-1'>You can now check it out in <u> my books section</u></div>

                </div>
            ) : (
                <div style={{ marginTop: '50px', textAlign: 'center' }}>Payment verification failed.</div>
            )}
        </>
    );
}

export default bookSuccess;
