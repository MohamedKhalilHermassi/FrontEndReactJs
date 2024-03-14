import { FaFacebookSquare, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5 className="mb-4">About ElKindy Music School</h5>
          <p>
            ElKindy Music School offers comprehensive music education for students of all ages and skill levels. Our experienced instructors provide personalized lessons in a supportive environment, helping students develop their musical talents and achieve their goals.
          </p>
        </div>
        <div className="col-md-4">
          <h5 className="mb-4">Photo Gallery</h5>
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <img src="images/image-1-370x254.jpg" className="img-fluid rounded" alt="Gallery " />
            </div>
            <div className="col-6 col-md-3 mb-3">
              <img src="images/image-2-370x254.jpg" className="img-fluid rounded" alt="Gallery " />
            </div>
            <div className="col-6 col-md-3 mb-3">
              <img src="images/image-3-370x254.jpg" className="img-fluid rounded" alt="Gallery " />
            </div>
            <div className="col-6 col-md-3 mb-3">
              <img src="images/image-4-370x254.jpg" className="img-fluid rounded" alt="Gallery " />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="mb-4">Connect with Us</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="https://www.facebook.com/elkindy.conservatoire" className="text-white text-decoration-none"><FaFacebookSquare className="me-2" /> Facebook</a></li>
            <li className="mb-2"><a href="https://www.instagram.com/conservatoire_el_kindy/" className="text-white text-decoration-none"><FaInstagram className="me-2" /> Instagram</a></li>
            <li className="mb-2"><a href="https://www.youtube.com/user/conservatoireelkindy" className="text-white text-decoration-none"><FaYoutube className="me-2" /> YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="bg-secondary text-center py-3">
      <p className="mb-0"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.2529435112974!2d10.191784875591324!3d36.836417765657615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34ea97b45431%3A0x9fa628e4f017bd3f!2sConservatoire%20Elkindy!5e0!3m2!1sen!2sus!4v1710237041042!5m2!1sen!2sus" width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe></p>
    </div>
    
  </footer>
  
  );
}

export default Footer;
