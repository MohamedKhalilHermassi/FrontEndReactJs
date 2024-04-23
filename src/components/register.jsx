import {  useNavigate } from "react-router-dom";
import  { useState,useRef,useEffect } from 'react';
import UserService from '../service/userService';
import * as faceapi from 'face-api.js';

function register() {
    const [email, setEmail] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [phone, setphone] = useState('');
    const [birthday, setbirthday] = useState('');
    const [address, setadress] = useState('');
    const [password, setPassword] = useState('');
    const [image, setimage] = useState('');
    const [passwordtouched, setpasswordtouched] = useState(false);
    const [birthdaytouched, setbirthdaytouched] = useState(false);
    const [phonetouched, setphonetouched] = useState(false);
    const [Lastnametouched, setLastnametouched] = useState(false);
    const [Firstnametouched, setFirstnametouched] = useState(false);
    const [emailtouched, setemailtouched] = useState(false);
    const [imageverif, setimageverif] = useState('');
    const [imageverifsubmit, setimageverifsubmit] = useState(false);
    const [popup, setopenpopup] =useState(false);
    const [verif, setverif] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const closeWebcam = () => {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
      setopenpopup(false);
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
      setloader(false);
      if (detection && detection.length>0) {
        const expression = detection[0].expressions.asSortedArray()[0].expression;
        if(detection.length>1){
          setimageverif('Please take selfie alone');
        }
        if(expression!="happy"){
          setimageverif('please smile to the camera');
        }
        else if(detection.length==1&&expression=="happy"){
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = 'nom_de_votre_image.png'; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          closeWebcam();
        }
      } else {
        setimageverif('No face detected');
      }
    }
    const VerifImageExpressions = async (imageFile) => {
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
        const imageUrl = e.target.result; // L'URL de l'image
        const image1 = document.createElement('img');
        image1.src = imageUrl;
        setloader(true);
        const detection1 =  await faceapi.detectAllFaces(image1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        setloader(false);
        if(detection1&&detection1.length==1){
        setimageverifsubmit(true);
      }else{
        setimageverifsubmit(false);
      }
    };
    reader.readAsDataURL(imageFile);
      }
    }
    const validateFirstName = (name) => {
      if(Firstnametouched){
        const regex = /^[a-zA-Z ]{1,15}$/;
        return regex.test(name);
      }else return true; 
      };
      const validateLastName = (name) => {
        if(Lastnametouched){
          const regex = /^[a-zA-Z ]{1,15}$/;
          return regex.test(name);
        }else return true; 
        };
      const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setimage(imageFile);
        VerifImageExpressions(imageFile);
      };
      const validateEmail = (email) => {
        if(emailtouched){
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        }
       else return true;
      };
    
      const validatePhone = (phone) => {
        if(phonetouched){
          const regex = /^\d{8}$/;
          return regex.test(phone);
        }
       else return true;
      };
      const areAllFieldsFilled = () => {
        return (
          email &&
          Firstname &&
          Lastname &&
          phone &&
          birthday &&
          address &&
          password &&
          image
        );
      };
      const validateBirthday = (birthday) => {
        if(birthdaytouched){
          const today = new Date();
          const birthdayDate = new Date(birthday);
          const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
          
       
          return birthdayDate <= fiveYearsAgo;
        }
      else return true;
      };
    
      const validatePassword = (password) => {
        if(passwordtouched){
          return password.length >= 8;
        }
        else return true;
      };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 
    setFirstnametouched(true);
    setLastnametouched(true);
    setemailtouched(true);
    setbirthdaytouched(true);
    setphonetouched(true);
    setpasswordtouched(true);
    let isValid = true;
    if (!validateFirstName(Firstname)) {
        isValid = false;
      }
  
      if (!validateLastName(Lastname)) {
        isValid = false;
      }
  
      if (!validateEmail(email)) {
        isValid = false;
      }
  
      if (!validatePhone(phone)) {
        isValid = false;
      }
  
      if (!validatePassword(password)) {
        isValid = false;
      }
      if (!validateBirthday(birthday)) {
        isValid = false;
      }
    
      if (!areAllFieldsFilled()) {
        setError("Please fill in all required fields");
        isValid = false;
      }
      if(imageverifsubmit==false){
        setError("sorry you need to take another photo");
        isValid = false;
      }
      if (isValid) {
        try {
          setloader(true);
            setIsLoading(true);
            const formData = new FormData();
  formData.append('fullname', Firstname + ' ' + Lastname);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('birthday', birthday);
  formData.append('image', image);
            const newuser = await UserService.register(formData);
            setloader(false);
            $('#veriffModal').modal('show');
         } catch (error) {
            if(error.message=="Request failed with status code 302"){
              setError("email exist");
            }else if(error.message=="Request failed with status code 400"){
              setError("please check your coordinates");
            }else{
              setError(error.message);
            }
            
          } finally {
            setIsLoading(false); 
         }
      }
    
  };
  const veriffyy = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      setIsLoading(true);
     
        const response = await UserService.verifyuser(email,verif);
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
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="First name" className="form-control"  value={Firstname} onChange={(event) => { setFirstname(event.target.value); setFirstnametouched(true); }}/>
                            <label className="form-label" htmlFor="form3Example1">First name { !validateFirstName(Firstname) && <span className="text-danger"> (First name can only contain letters and spaces (max 15 characters))</span> }</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="Last name" className="form-control" value={Lastname} onChange={(event) => {setLastname(event.target.value); setLastnametouched(true)}}/>
                            <label className="form-label" htmlFor="form3Example2">Last name  { !validateLastName(Lastname) && <span className="text-danger"> (Last name can only contain letters and spaces (max 15 characters))</span> }</label>
                          </div>
                        </div>
                      </div>
                       {/* phone input */}
                       <div className="form-outline mb-4">
                        <input type="number" id="phone" className="form-control" value={phone} onChange={(event) => {setphone(event.target.value);setphonetouched(true)}}/>
                        <label className="form-label" htmlFor="form3Example3">phone { !validatePhone(phone) && <span className="text-danger"> (Phone number must be 8 digits)</span> }</label>
                      </div>
                      {/* birthday input */}
                      <div className="form-outline mb-4">
                        <input type="date" id="Date of birth" className="form-control" value={birthday} onChange={(event) => {setbirthday(event.target.value);setbirthdaytouched(true)}}/>
                        <label className="form-label" htmlFor="form3Example3">Date of birth { !validateBirthday(birthday) && <span className="text-danger"> (Sorry, the minimum age to enroll in the conservatory is 5 years old)</span> }</label>
                      </div>
                      {/* adress input */}
                      <div className="form-outline mb-4">
                        <input type="text" id="Address" className="form-control" value={address} onChange={(event) => setadress(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Address</label>
                      </div>
                      {/* Email input */}
                      <div className="form-outline mb-4">
                        <input type="email" id="Email address " className="form-control"  value={email} onChange={(event) => {setEmail(event.target.value);setemailtouched(true)}}/>
                        <label className="form-label" htmlFor="form3Example3">Email address { !validateEmail(email) && <span className="text-danger"> (Please enter a valid email address)</span> }</label>
                      </div>
                      {/* Password input */}
                      <div className="form-outline mb-4">
                        <input type="password" id="Password" className="form-control" value={password} onChange={(event) => {setPassword(event.target.value);setpasswordtouched(true)}}/>
                        <label className="form-label" htmlFor="form3Example4">Password { !validatePassword(password) && <span className="text-danger"> (Password must be at least 8 characters long)</span> }</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="file" id="image" className=" custom-file" onChange={handleImageChange} />
                        <label className="form-label" htmlFor="image">Image</label>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="image">Or</label>
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={()=>{setopenpopup(true);startVideo();}}>Take Selfie</button>
                    </div>
                    

                      {/* Submit button */}
                      <button type="submit" className="btn btn-warning btn-block mb-4" >
                      {error ? "Fix errors" : "Sign up"}
                      </button>
                      {error && <p className="text-center text-danger">{error}</p>}
                      </form>
                      
                     
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
        
      <label className="form-label" htmlFor="form5Example5">Code Verification</label>
                          <input type="text" id="form5Example5" className="form-control"  value={verif} onChange={(event) => setverif(event.target.value)} />
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
  
  export default register;
  