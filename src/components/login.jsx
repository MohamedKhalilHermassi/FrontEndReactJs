import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import UserService from '../service/userService';
import { jwtDecode } from "jwt-decode";

function Login() {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
      const token = await UserService.login(email, password);
      const decodedToken = jwtDecode(token);
      let redirectPath = '/'; 
    if (decodedToken.role === 'admin') {
      redirectPath = '/admin';
    }
    window.location.href = redirectPath;
    } catch (error) {
      if(error.message=="Request failed with status code 401"){
        setError("Invalid email or password");
      }else if(error.message=="Request failed with status code 403"){
        setError("Sorry you don't have access");
      }else{
        setError(error.message);
      }
      
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
    return (
      <>
        {/* Section: Design Block */}
        
        <section className="background-radial-gradient overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: "\n    .background-radial-gradient {\n      width: 100%;\n      min-height: 100vh;\n      background-color: hsl(218, 41%, 15%);\n      background-image: radial-gradient(650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%),\n        radial-gradient(1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%);\n    }\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#ff8800, #ffdd33);\n      overflow: hidden;\n    }\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#ff8800, #ffdd33);\n      overflow: hidden;\n    }\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  " }} />
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                  ElKindy Conservatory <br />
                  <span style={{ color: 'hsl(218, 81%, 75%)' }}>
                  Harmonize Your Potential !
                  </span>
                </h1>
                <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                  Embark on a journey of artistic discovery within the vibrant halls of our conservatory, where passion meets proficiency
                </p>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
                <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    
                    <div className="text-center">
            <img src="../public/images/Untitled-1.png" className="img-fluid mx-auto mb-5" alt="Responsive Image" />
                    </div>

                      

                      <form onSubmit={handleSubmit}>
                        {/* Email input */}
                        <div className="form-outline mb-4">
                          <input type="email" id="form3Example3" className="form-control"  value={email} onChange={(event) => setEmail(event.target.value)}/>
                          <label className="form-label" htmlFor="form3Example3">Email address</label>
                        </div>
                        {/* Password input */}
                        <div className="form-outline mb-4">
                          <input type="password" id="form3Example4" className="form-control"  value={password} onChange={(event) => setPassword(event.target.value)} />
                          <label className="form-label" htmlFor="form3Example4">Password</label>
                        </div>
                      
                        <button  type="submit" className="btn btn-primary btn-block mb-4" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                        </button>
                        <p className="text-center text-danger">
                        <span>{error}</span>
                       
                      </p>
                      </form>
                      <p className="text-center">
                        <span>New on our platform?</span>
                        <a href="javascript:;">
                          <Link to="/register"> Create an account</Link>
                        </a>
                      </p>
                      {/* Register buttons */}
                      <div className="text-center">
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-facebook-f" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-google" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-twitter" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-github" />
                        </button>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <button onClick={handleClick} type="button" className="btn rounded-pill btn-icon btn-outline-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                          </svg>
                        </button>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section: Design Block */}
      </>
    )
  }
  
  export default Login;
  