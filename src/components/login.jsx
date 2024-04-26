import { Link, useNavigate } from "react-router-dom";
import { useState ,useRef,useEffect} from 'react';
import UserService from '../service/userService';
import { jwtDecode } from "jwt-decode";
import * as faceapi from 'face-api.js';

function Login() {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/');
  };
  const [user, setuser] = useState(null);
  const [pwd, setpwd] = useState('');
  const [veriff, setveriff] = useState('');
  const [cpwd, setcpwd] = useState('');
  const [verif, setverif] = useState('');
  const [emailll, setEmailll] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageverif, setimageverif] = useState('');
  const [imageverifsubmit, setimageverifsubmit] = useState(false);
  const [popup, setopenpopup] =useState(false);
  const [popup2, setopenpopup2] =useState(false);
  const [modelsLoaded, setModelsLoaded] =useState(false);
    const [captureVideo, setCaptureVideo] =useState(false);
    const [loader, setloader] =useState(false);
    const videoRef =useRef();
    const videoHeight =480;
    const videoWidth =640;
    const canvasRef =useRef();
    useEffect(() => {
      const loadModels = async () => {
        
        try {
          setloader(true);
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/model/tiny_face_detector_model-weights_manifest.json'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/model/face_landmark_68_model-weights_manifest.json'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/model/face_recognition_model-weights_manifest.json'),
            faceapi.nets.faceExpressionNet.loadFromUri('/model/face_expression_model-weights_manifest.json'),
          ]);
          setModelsLoaded(true);
          setloader(false);
        } catch (error) {
          console.error('Error loading models:', error);
        }
      };
      
      loadModels();
    }, []);
    const startVideo = () => {
      setCaptureVideo(true);
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    }
    const takeSnapshot = async () => {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL();
      setloader(true);
      const detection = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      
      if (detection && detection.length>0) {
        if(detection.length>1){
          setimageverif('Please take selfie alone');
          setloader(false);
        }
        else if(detection.length==1){
          await faceapi.nets.tinyFaceDetector.loadFromUri('/model/tiny_face_detector_model-weights_manifest.json');
          await faceapi.nets.faceLandmark68Net.loadFromUri('/model/face_landmark_68_model-weights_manifest.json');
          await faceapi.nets.faceRecognitionNet.loadFromUri('/model/face_recognition_model-weights_manifest.json');
          await faceapi.nets.ssdMobilenetv1.loadFromUri('/model/ssd_mobilenetv1_model-weights_manifest.json');
          const image1 = document.createElement('img');
          const image2 = document.createElement('img');
          image1.src = imageUrl;
          image2.src = `https://backendexpressjsback.onrender.com/${user.image}`;
          image2.crossOrigin='anonymous';
          await Promise.all([
            image1.decode(),
            image2.decode()
          ]);
          const detection1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
          const detection2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();
          if (detection1 && detection2) {
            const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
            const threshold = 0.6;
            if (distance < threshold) {
              try {
                const token = await UserService.faciallogin(user.email);
                const decodedToken = jwtDecode(token);
                const expirePaidDate = new Date(decodedToken.expirePaid);
                const currentDate = new Date();
                let redirectPath = '/'; 
                if (decodedToken.role === 'Student' && expirePaidDate < currentDate) {
                  redirectPath = '/pricing-pack';
                }
              if (decodedToken.role === 'admin') {
                redirectPath = '/admin';
              }
              window.location.href = redirectPath;
              } catch (error) {
                if(error.message=="Request failed with status code 400"){
                  setimageverif("Invalid email or password");
                }else if(error.message=="Request failed with status code 403"){
                  setimageverif("Sorry you don't have access");
                }
                else if(error.message=="Request failed with status code 401"){
                  $('#veriffModal').modal('show');
                }else{
                  setimageverif(error.message);
                }
                
              }
            } else {
              setimageverif("sorry your face doesn't look like the user associated with the email");
              setloader(false);
            }
          } else {
            setimageverif('there is an error detected please try again');
            setloader(false);
          }

        }
      } else {
        setimageverif('No face detected');
        setloader(false);
      }
    }
    const handleVideoOnPlay = () => {
      setInterval(async () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
          const displaySize = {
            width: videoWidth,
            height: videoHeight
          }
  
          faceapi.matchDimensions(canvasRef.current, displaySize);
  
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        
        }
      }, 100)
    }
    const closepopup = () =>{
      setopenpopup(false);
    }
    const closeWebcam = () => {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
      setopenpopup2(false);
      setloader(false);
    }
    const verifemail = async (event) =>{
      event.preventDefault();
      try {
      setError2(null);
      setloader(true);
      const newuser = await UserService.getUser(email);
      setloader(false);
      setuser(newuser);
      setopenpopup(false);
      startVideo();
      setopenpopup2(true);
      }catch (error) {
        setloader(false);
        if(error.message=="Failed to retrieve user."){
          setError2("Invalid email ");
        }else{
          console.log(error.message);
        }
        
      }
    }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
      const token = await UserService.login(email, password);
      const decodedToken = jwtDecode(token);
      const expirePaidDate = new Date(decodedToken.expirePaid);
      console.log(expirePaidDate);
      const currentDate = new Date();


      let redirectPath = '/'; 
      if (decodedToken.role === 'Student' && expirePaidDate < currentDate) {
        redirectPath = '/pricing-pack';
      }
    if (decodedToken.role === 'admin') {
      redirectPath = '/admin';
    }
    window.location.href = redirectPath;
    } catch (error) {
      if(error.message=="Request failed with status code 400"){
        setError("Invalid email or password");
      }else if(error.message=="Request failed with status code 403"){
        setError("Sorry you don't have access");
      }
      else if(error.message=="Request failed with status code 401"){
        $('#veriffModal').modal('show');
      }else{
        setError(error.message);
      }
      
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const forget = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
      const response = await UserService.Forgetpassword(emailll);
      if(response){
        $("[data-dismiss=modal]").trigger({ type: "click" });
        $('#ResetModal').modal('show');
      }
    } catch (error) {
      if(error.message=="Request failed with status code 404"){
        $("[data-dismiss=modal]").trigger({ type: "click" });
        $('#errorModal').modal('show');
      }
     
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const reset = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
      let isvalid=true;
      
      if(pwd!=cpwd){
        isvalid=false;
        setError("password does't match");
      }
      if(isvalid){
        const response = await UserService.verifypassword(emailll,verif,pwd);
        window.location.href ='/signin';
      }
      
    } catch (error) {
      if(error.message=="Request failed with status code 400"){
        setError("code invalid");
      }
      
     
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  const veriffyy = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
     
        const response = await UserService.verifyuser(email,veriff);
        window.location.href ='/signin';
      
      
    } catch (error) {
      if(error.message=="Request failed with status code 400"){
        setError("code invalid");
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
        {loader && ( 
          <div className="loader-popup" >
          <div className="loader-content" >
              <div className="loader-container">
                  <div className="loader"></div>
              </div>
          </div>
      </div>
        )}
        {popup && ( 
           <div className="popup">
              <div className="popup-content">
              <button onClick={closepopup} style={{ cursor: 'pointer', backgroundColor: 'transparent', color: '#808fa0',borderColor:'transparent' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    </button>
              <form onSubmit={verifemail}>
                        <div className="form-outline mb-4">
                          <input type="email" id="form3Example9" className="form-control"  value={email} onChange={(event) => setEmail(event.target.value)}/>
                          <label className="form-label" htmlFor="form3Example9">Email address</label>
                        </div>
                        <button  type="submit" className="btn btn-primary btn-block mb-4">
                        Veriif
                        </button>
                        <p className="text-center text-danger">
                        <span>{error2}</span>
                       
                      </p>
                      </form>
              </div>
          </div>
        )}
        {popup2 && (
                      <div className="popup">
                        <div className="popup-content">
                            {captureVideo && modelsLoaded && (
                                <div>
                                   <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'transparent', color: '#808fa0',borderColor:'transparent' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    </button>
                                    <button onClick={takeSnapshot} className="btn btn-primary btn-block mb-4">
                                      Take Selfie
                                    </button>
                                   
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                      <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                                      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                                      
                                    </div>
                                    <p>{imageverif}</p>
                                </div>
                             )}
                        </div>
                      </div>
                    )}
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
                      <button  type="submit" className="btn btn-primary btn-block mb-4" onClick={()=>{setopenpopup(true);}}>Facial authentication</button>
                      <p className="text-center">
                        <span>New on our platform?</span>
                        <a >
                          <Link to="/register"> Create an account</Link>
                        </a>
                      </p>
                      {/* Register buttons */}
                      <div className="text-center">
                      <button type="button" className="btn"  style={{ backgroundColor: 'transparent' }} data-toggle="modal" data-target="#exampleModal">
                      Forgot password ?
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
      
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Please provide your email</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={forget}>
        <div className="modal-body text-center">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example4">Email address</label>
            <input type="email" id="form4Example4" className="form-control" value={emailll} onChange={(event) => setEmailll(event.target.value)}/>
          </div>
        </div>
        <div className="modal-footer text-center">
          <button type="submit" className="btn btn-primary"> {isLoading ? "loading..." : "Ok"}</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div className="modal fade" id="errorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sorry, something went wrong. Please verify your email account.</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body text-center">
      <i className="fas fa-exclamation-circle fa-3x text-danger animate__animated animate__shakeX"></i>
      </div>
    </div>
  </div>
</div>


<div className="modal fade" id="ResetModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Reset password</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={reset}>
      <div className="modal-body text-center">
      <div className="form-outline mb-4">
        
      <label className="form-label" htmlFor="form5Example5">Code Verification</label>
                          <input type="text" id="form5Example5" className="form-control"  value={verif} onChange={(event) => setverif(event.target.value)} />
      <label className="form-label" htmlFor="form5Example6">New Password</label>
                          <input type="password" id="form5Example6" className="form-control"  value={pwd} onChange={(event) => setpwd(event.target.value)} />
                         
                        
                        <label className="form-label" htmlFor="form5Example7">Confirm Password</label>
                        
                          <input type="password" id="form5Example7" className="form-control"  value={cpwd} onChange={(event) => setcpwd(event.target.value)} />
                        
                        
                        <button type="submit" className="btn btn-primary"> {isLoading ? "loading..." : "Ok"}</button>
                        <p className="text-center text-danger">
                        <span>{error}</span>
                       
                      </p>
      </div>
      </div>
      </form>
    </div>
  </div>
</div>

<div className="modal fade" id="veriffModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Verification Code</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={veriffyy}>
      <div className="modal-body text-center">
      <div className="form-outline mb-4">
        
      <label className="form-label" htmlFor="form5Example10">Code Verification</label>
                          <input type="text" id="form5Example10" className="form-control"  value={veriff} onChange={(event) => setveriff(event.target.value)} />
                        <button type="submit" className="btn btn-primary"> {isLoading ? "loading..." : "Ok"}</button>
                        <p className="text-center text-danger">
                        <span>{error}</span>
                       
                      </p>
      </div>
      </div>
      </form>
    </div>
  </div>
</div>

        {/* Section: Design Block */}
      </>
    )
  }
  
  export default Login;
  