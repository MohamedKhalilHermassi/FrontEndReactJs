import React, { useEffect, useState } from 'react';
import './pricingPack.scss';
import {useNavigate} from 'react-router-dom';
import axios from "axios"
const PricingPack = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [UserId, setUserId] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolder: '',
    type: ''
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolder: '',
  });

  useEffect(() => {
    setUserId(localStorage.getItem('id'))
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handltTotal = (total) => {
    setTotal(total);

  };
  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
    toggleModal();
  };

  const handleTotal = (totalAmount) => {
    setTotal(totalAmount);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.cardNumber) {
      validationErrors.cardNumber = 'Please enter a valid card number';
    }
    if (formData.cardNumber.length!=16) {
        validationErrors.cardNumber = 'the card number must be 16 digits exactly';
      }
 
    if (!formData.cvv) {
      validationErrors.cvv = 'Please enter the CVV';
    }
    if (formData.cvv.length!=3) {
        validationErrors.cvv = 'the CVV must be 3 digits';
      }
      if (formData.cvv<0) {
        validationErrors.cvv = 'Please enter a valid cvv';
      }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('https://backendexpressjsback.onrender.com/payement/pay', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: UserId,
            type: selectedPlan,
          }),
        });
        if (response.ok) {
          console.log('Payment successful');
          navigate('/signin',{replace:true})
          toggleModal();
        } else {
          console.error('Payment failed');
          // Handle payment failure
        }
      } catch (error) {
        console.error('Error occurred while making payment:', error);
        // Handle error
      }
      try {
        const response = await axios.post('https://backendexpressjsback.onrender.com/transaction/add', formData); // Replace 'your-route' with your actual route
        if (response.data.success) {
          console.log('Transaction created successfully');
          // Handle success
        } else {
          console.error('Failed to create transaction:', response.data.error);
          // Handle failure
        }
      } catch (error) {
        console.error('Error creating transaction:', error);
        // Handle error
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      type: selectedPlan,
      userid: UserId,
      [name]: value,
    });
  };




  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <section className="plans__container">
    <div className="plans">
      {/* Plan items content */}
      <div className="planItem__container">
        <div className="planItem planItem--pro">
          {/* Monthly Plan */}
          <div className="card">
            <div className="card__header">
              <div><img width="48" height="48" src="https://img.icons8.com/color/48/middle-east-music.png" alt="middle-east-music"/></div>
              <h2>Monthly</h2>
            </div>
            <div className="card__desc">Access to our online platform and enjoy every moment of your learning journey.</div>
          </div>
          <div className="price">60 TND<span>/ month</span></div>
          <ul className="featureList">
            <li>Events E-Ticketing</li>
            <li>Online Scheduling</li>
            <li>Easy Course Subscription</li>
          </ul>
          <button className="button button--blue text-white" onClick={() =>{ handlePlanSelection('Monthly')
handltTotal(60)
        }}>Choose</button>
        </div>

        {/* Trimesterly Plan */}
        <div className="planItem planItem--pro">
          <div className="card">
            <div className="card__header">
              <div><img width="48" height="48" src="https://img.icons8.com/color/48/classic-music.png" alt="classic-music"/></div>
              <h2>Trimesterly</h2>
            </div>
            <div className="card__desc">Access to our online platform and enjoy every moment of your learning journey.</div>
          </div>
          <div className="price">175 DT<span>/ 3 months</span></div>
          <ul className="featureList">
            <li>Access to our online Market</li>
            <li>Online musical Library</li>
            <li>Real-Time Chat with classmates</li>
          </ul>
          <button className="button button--blue text-white" onClick={() =>{ handlePlanSelection('Trimesterly')
        handltTotal(175)
        }}>Choose</button>
        </div>

        {/* Annually Plan */}
        <div className="planItem planItem--pro">
          <div className="card">
            <div className="card__header">
              <div><img width="48" height="48" src="https://img.icons8.com/color/48/rock-music.png" alt="rock-music"/></div>
              <h2>Annually</h2>
              <div className="card__label label">Best Value</div>
            </div>
            <div className="card__desc">Access to our online platform and enjoy every moment of your learning journey.</div>
          </div>
          <div className="price">650 DT<span>/ year</span></div>
          <ul className="featureList">
            <li>Secure Payement</li>
            <li>24/7 Access</li>
            <li>Chat support</li>
          </ul>
          <button className="button button--blue text-white" onClick={() => {
            
            handltTotal(650);
            handlePlanSelection('Annually')}}>Choose</button>
        </div>
      </div>
    </div>

      {/* Modal */}
     
      
      {showModal && (
  <div className="form__container mx-5 mt-5">
    <h2>Total: {total} TND</h2>
    <h3>Selected Plan: {selectedPlan}</h3>
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="cardNumber">Credit Card Number:</label>
        <input
          type="number"
          className={`form-control ${errors.cardNumber && 'is-invalid'}`}
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          maxLength={16}
          minLength={16}
        />
        {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="expiryMonth">Expiry Month:</label>
        <select
          className={`form-control ${errors.expiryDate && 'is-invalid'}`}
          id="expiryMonth"
          name="expiryMonth"
          value={formData.expiryMonth}
          onChange={handleInputChange}
        >
          <option value="">Select Month</option>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={String(index + 1).padStart(2, '0')}>
              {String(index + 1).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="expiryYear">Expiry Year:</label>
        <select
          className={`form-control ${errors.expiryDate && 'is-invalid'}`}
          id="expiryYear"
          name="expiryYear"
          value={formData.expiryYear}
          onChange={handleInputChange}
        >
          <option value="">Select Year</option>
          {[...Array(7)].map((_, index) => (
            <option key={index} value={new Date().getFullYear() + index}>
              {new Date().getFullYear() + index}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="number"
          className={`form-control ${errors.cvv && 'is-invalid'}`}
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          minLength={3}
          maxLength={3}
        />
        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="cardHolder">Cardholder Name:</label>
        <input
          type="text"
          className={`form-control ${errors.cardHolder && 'is-invalid'}`}
          id="cardHolder"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleInputChange}
        />
        {errors.cardHolder && <div className="invalid-feedback">{errors.cardHolder}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="total">Total :</label>
        <input
          type="number"
          className="form-control"
          id="total"
          name="total"
          value={total}
          disabled
        />
        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Submit Payment</button>
    </form>
  </div>
)}



    </section>
    </>
  );
};

export default PricingPack;
