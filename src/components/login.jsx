import { useNavigate } from "react-router-dom";



function Login() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
    return (
      <>
        {/* Section: Design Block */}
        <br />
        <br />
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
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Temporibus, expedita iusto veniam atque, magni tempora mollitia
                  dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                  ab ipsum nisi dolorem modi. Quos?
                </p>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
                <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form>
                    <div className="text-center">
            <img src="../public/images/Untitled-1.png" className="img-fluid mx-auto mb-5" alt="Responsive Image" />
                    </div>

                      

                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1" className="form-control" />
                            <label className="form-label" htmlFor="form3Example1">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example2" className="form-control" />
                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                          </div>
                        </div>
                      </div>
                      {/* Email input */}
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3" className="form-control" />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                      </div>
                      {/* Password input */}
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4" className="form-control" />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                      </div>
                    
                      {/* Submit button */}
                      <button type="submit" className="btn btn-warning btn-block mb-4">
                        Sign up
                      </button>
                      
                      <button onClick={handleClick} type="submit" className="btn btn-primary btn-block mb-4">
                        Return
                      </button>
                     
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
                    </form>
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
  