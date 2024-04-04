import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Acceuil() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`page-header ${isScrolled ? 'scrolled' : ''}`}>
        <h1 className="display-1 text-orange mx-5">ElKindy Conservatory</h1>
        <div className="page-header-image reduced-opacity" style={{backgroundImage: 'url("images/guitar-2886886_1280.jpg")'}} />
        <div className="container pt-300">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              {/* Add any additional content or styling here */}
            </div>
          </div>
        </div>
      </div>

      <div className="section features-1">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <br />
              <span className="badge badge-primary badge-pill mb-3">Insight</span>
              <h3 className="display-3">Full-Funnel Social Analytics</h3>
              <p className="lead">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">



            </div>
            <div className="col-md-4">



            </div>
            <div className="col-md-4">



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Acceuil;
