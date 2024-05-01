import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function PaymentSuccess() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('payment_id');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/payement/verify/${paymentId}`)
            .then((result) => {
                console.log(result.data);
                if (result.data.result.status === "SUCCESS") {
                    axios.put('http://localhost:3000/payement/pay',{userid:localStorage.getItem('id'),type:localStorage.getItem('type')})
                    setSuccess(true);
                    setTimeout(()=>{
                        navigate('/signin')
                    },10000)
                }
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false)); // Set loading to false when request is completed
    }, [paymentId]);

    return (
        <>
            {loading ? (
                <div style={{ marginTop: '150px', textAlign: 'center', height: '1000px',padding: '20px' }}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            ) : success ? (
                <div style={{ marginTop: '50px', height: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #ccc', borderRadius: '8px', padding: '20px' }}>
                    <img width="96" height="96" src="https://img.icons8.com/fluency/96/cash--v1.png" alt="cash--v1" />
                    <div className='mt-1'>Your payment has been made successfully!</div>
                    <p><u>Payment ID:</u> <b className='mx-1'> {paymentId}</b></p>
                    <div className='mt-1'>You will be redirected to the login page in 5 seconds</div>

                </div>
            ) : (
                <div style={{ marginTop: '50px', textAlign: 'center' }}>Payment verification failed.</div>
            )}
        </>
    );
}

export default PaymentSuccess;
