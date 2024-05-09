import React, { useEffect, useState } from 'react';
import './pricingPack.scss';
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import { replace } from 'formik';
const PricingPack = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [UserId, setUserId] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    setUserId(localStorage.getItem('id'))
  }, []);



  

  const pay = async (amount) => {
   
    await axios.post("http://localhost:3000/payement/flouci",{amount:amount}).then((result)=>{
      window.location.replace(result.data.result.link); 
    console.log(result.data) 
      const link = response.data.result.link;
    
  
    }).catch((err)=>console.log(err.message))

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
          <button className="button button--blue text-white" onClick={() =>{ pay(60000) 
          localStorage.setItem('type','Monthly')

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
          <button className="button button--blue text-white" onClick={() =>{ pay(175000)
         localStorage.setItem('type','Trimesterly')
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
            
            pay(650000)
            localStorage.setItem('type','Annually')
            }}>Choose</button>
        </div>
      </div>
    </div>

     




    </section>
    </>
  );
};

export default PricingPack;
