import { FaFacebookSquare, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-light text-center">
      <div className="container p-4">
        {/* Section: Form */}
        {/* Section: Text */}
        <section className="mb-3">
          <h5>About ElKindy Music School</h5>
          <p>
            ElKindy Music School offers comprehensive music education for
            students of all ages and skill levels. Our experienced instructors
            provide personalized lessons in a supportive environment, helping
            students develop their musical talents and achieve their goals.
          </p>
        </section>
        {/* Section: Text */}
        {/* Section: Gallery */}
        <section className="mb-3">
          <h5>Photo Gallery</h5>
          <div className="row">
            <div className="col-md-3">
              <img src="images/image-1-370x254.jpg" className="img-fluid" alt="Gallery Image" />
            </div>
            <div className="col-md-3">
              <img src="images/image-2-370x254.jpg" className="img-fluid" alt="Gallery Image" />
            </div>
            <div className="col-md-3">
              <img src="images/image-3-370x254.jpg" className="img-fluid" alt="Gallery Image" />
            </div>
            <div className="col-md-3">
              <img src="images/image-4-370x254.jpg" className="img-fluid" alt="Gallery Image" />
            </div>
          </div>
        </section>
        {/* Section: Gallery */}
        {/* Section: Links */}
        <section>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Social Media</h5>
              <ul className="list-unstyled mb-4">
                <li>
                  <a href="https://www.facebook.com/elkindy.conservatoire" className="text-dark">
                    <FaFacebookSquare className="me-2" /> FACEBOOK
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/conservatoire_el_kindy/" className="text-dark">
                    <FaInstagram className="me-2" /> INSTAGRAM
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/user/conservatoireelkindy" className="text-dark">
                    <FaYoutube className="me-2" /> YOUTUBE
                  </a>
                </li>
              </ul>
            </div>
            {/* Add more columns as needed */}
          </div>
        </section>
        {/* Section: Links */}
        {/* Google Maps */}
       <strong> <div>Our Location</div></strong>
        <div className="mt-4 d-flex justify-content-center">
          
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.2529435112974!2d10.191784875591324!3d36.836417765657615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34ea97b45431%3A0x9fa628e4f017bd3f!2sConservatoire%20Elkindy!5e0!3m2!1sen!2sus!4v1710237041042!5m2!1sen!2sus" width="400" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
        {/* Google Maps */}
      </div>
      {/* Grid container */}
    </footer>
  );
}

export default Footer;
