import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotPaid from './subscription/NotPaid';
const images = ['https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/image-8.jpg?alt=media&token=ada5a786-2319-4344-9f01-655c36f9693d', 'https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/image-4-1.jpg?alt=media&token=213151c1-ff19-403e-ab1a-ebe1655448c4', 'https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/image-15.jpg?alt=media&token=8fd5e406-04d6-4819-a5d2-b5317690a16f']; 
const texts = [
  { title: 'Titre de la section 1', description: 'Description de la section 1' },
  { title: 'Titre de la section 2', description: 'Description de la section 2' },
  { title: 'Titre de la section 3', description: 'Description de la section 3' }
];
function Acceuil() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [decodedToken,setDecodedToken] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    
    const token = localStorage.getItem('userToken');
    if (token) {
      setDecodedToken(jwtDecode(token));
    }
    
   
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const currentImage = images[currentImageIndex];
  const currentText = texts[currentImageIndex];
  return (
    <>
     
       {decodedToken.role=="Student" && decodedToken.paid === false ? (
       <NotPaid></NotPaid>

      ) : (
        <>
      <div className={`page-header ${isScrolled ? 'scrolled' : ''}`}>
        <h1 className="display-1 text-white mx-5">ElKindy Conservatory</h1>
        <div className="page-header-image reduced-opacity" style={{backgroundImage: `url(${currentImage})`}} />
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
              <span className="badge badge-warning badge-pill mb-3">for all ages</span>
              <div className='row'>
              <p className="lead">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
                  <div className='col-4'>
                    <img className='img-fluid' src='https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/Capture_d_%C3%A9cran_2024-05-02_170827-removebg-preview.png?alt=media&token=299b1403-7ced-4274-80da-5ee4fc36280b'></img>
                    <span>Children</span>
                    <p>Our school welcomes children from the age of 5. We introduce them to the world of music and the fun and educational facets of sounds and rhythms.</p>
                  </div>
                  <div className='col-4'>
                    <img className='img-fluid' src='https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/Capture_d_%C3%A9cran_2024-05-02_170848-removebg-preview.png?alt=media&token=6a62ab88-6129-4486-b419-1bbe86b5fb46'></img><br></br>
                    <span>Teenagers</span>
                    <p>During adolescence, the ability to develop one's passion is at its peak. We welcome your teenagers in a setting conducive to their musical development.</p>
                  </div>
                  <div className='col-4'>
                    <img className='img-fluid' src='https://firebasestorage.googleapis.com/v0/b/elkindy-5cf2d.appspot.com/o/Capture_d_%C3%A9cran_2024-05-02_170903-removebg-preview.png?alt=media&token=7086a157-9044-4f7a-a635-dacf8ab2c5df'></img><br></br>
                    <span>Adults</span>
                    <p>You will see music differently, beyond fun, you will discover a new type of sharing and learning adapted to your desires.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section features-2" style={{backgroundColor:'black'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <br />
              <span className="badge badge-warning badge-pill mb-3" >testimony</span>
              <div className='row'>
              <p className="lead" style={{color:'white'}}>Music gives soul to our hearts and wings to thought</p>
                  <div className='col-6'>
                  <span style={{color:'white'}}>Part One: What do you think of ElKindy?</span><br></br>
                  <iframe width="500" height="300" src="https://www.youtube.com/embed/2bR0Bn4rPQA" frameborder="0" allowfullscreen></iframe>
                  </div>
                  <div className='col-6' style={{paddingLeft:'10%'}}>
                    <span style={{color:'white'}}>Part Two: What do you think of ElKindy?</span><br></br>
                    <iframe width="500" height="300" src="https://www.youtube.com/embed/PBQLsaRiN3o" frameborder="0" allowfullscreen></iframe>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
      )}
      </>
  );
}

export default Acceuil;
