import {  useNavigate } from "react-router-dom";
import  { useState } from 'react';
import UserService from '../service/userService';


function register() {
    const [email, setEmail] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [phone, setphone] = useState('');
    const [birthday, setbirthday] = useState('');
    const [address, setadress] = useState('');
    const [level,setlevel] = useState('');
    const [password, setPassword] = useState('');
    const [image, setimage] = useState('');
    const [verif, setverif] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  
    const handleAddTimeSlot = () => {
      const newTimeSlot = { startTime: '', endTime: '' };
    
      newTimeSlot.startTime = new Date();
      newTimeSlot.endTime = new Date();
      console.log(newTimeSlot);
      setAvailableTimeSlots([...availableTimeSlots, newTimeSlot]);
    };
    
    
  
    const handleRemoveTimeSlot = (index) => {
      const updatedTimeSlots = availableTimeSlots.filter((_, i) => i !== index);
      setAvailableTimeSlots(updatedTimeSlots);
    };
    const validateName = (name) => {
        const regex = /^[a-zA-Z ]{1,15}$/;
        return regex.test(name);
      };
      const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setimage(imageFile);
      };
      const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };
    
      const validatePhone = (phone) => {
        const regex = /^\d{8}$/;
        return regex.test(phone);
      };
      const validateLevel = (level) => {
        const regex = /[1-7]/;
        return regex.test(level);
      };
      const areAllFieldsFilled = () => {
        return (
          availableTimeSlots&&
          email &&
          Firstname &&
          Lastname &&
          phone &&
          level &&
          birthday &&
          address &&
          password &&
          image
        );
      };
      const validateBirthday = (birthday) => {
        const today = new Date();
        const birthdayDate = new Date(birthday);
        const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
        
     
        return birthdayDate <= fiveYearsAgo;
      };
    
      const validatePassword = (password) => {
        return password.length >= 8;
      };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); 
    let isValid = true;

    for (const timeSlot of availableTimeSlots) {
      if (timeSlot.startTime >= timeSlot.endTime) {
          setError("End time must be greater than start time for all time slots");
          isValid = false;
          break;
      }
  }

    if (!validateName(Firstname)) {
        isValid = false;
      }
  
      if (!validateName(Lastname)) {
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
  
      if (isValid) {
        try {
            setIsLoading(true);
            const formData = new FormData();
  formData.append('fullname', Firstname + ' ' + Lastname);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('birthday', birthday);
  formData.append('level',level);
  formData.append('image', image);
  const availableTimeJSON = JSON.stringify(availableTimeSlots);
  formData.append('availableTime', availableTimeJSON);
            const newuser = await UserService.register(formData);
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
                            <input type="text" id="First name" className="form-control"  value={Firstname} onChange={(event) => setFirstname(event.target.value)}/>
                            <label className="form-label" htmlFor="form3Example1">First name { !validateName(Firstname) && <span className="text-danger"> (First name can only contain letters and spaces (max 15 characters))</span> }</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="Last name" className="form-control" value={Lastname} onChange={(event) => setLastname(event.target.value)}/>
                            <label className="form-label" htmlFor="form3Example2">Last name  { !validateName(Lastname) && <span className="text-danger"> (Last name can only contain letters and spaces (max 15 characters))</span> }</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="number" id="level" className="form-control" value={level} onChange={(event) => setlevel(event.target.value)}/>
                            <label className="form-label" htmlFor="form3Example2">Level { !validateLevel(level) && <span className="text-danger"> (Level must be between 1 and 7)</span> }</label>
                          </div>
                        </div>
                      </div>
                       {/* phone input */}
                       <div className="form-outline mb-4">
                        <input type="number" id="phone" className="form-control" value={phone} onChange={(event) => setphone(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">phone { !validatePhone(phone) && <span className="text-danger"> (Phone number must be 8 digits)</span> }</label>
                      </div>
                      {/* birthday input */}
                      <div className="form-outline mb-4">
                        <input type="date" id="Date of birth" className="form-control" value={birthday} onChange={(event) => setbirthday(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Date of birth { !validateBirthday(birthday) && <span className="text-danger"> (Sorry, the minimum age to enroll in the conservatory is 5 years old)</span> }</label>
                      </div>
                      {/* adress input */}
                      <div className="form-outline mb-4">
                        <input type="text" id="Address" className="form-control" value={address} onChange={(event) => setadress(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Address</label>
                      </div>
                      {/* Email input */}
                      <div className="form-outline mb-4">
                        <input type="email" id="Email address " className="form-control"  value={email} onChange={(event) => setEmail(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Email address { !validateEmail(email) && <span className="text-danger"> (Please enter a valid email address)</span> }</label>
                      </div>
                      {/* Password input */}
                      <div className="form-outline mb-4">
                        <input type="password" id="Password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example4">Password { !validatePassword(password) && <span className="text-danger"> (Password must be at least 8 characters long)</span> }</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="file" id="image" className="form-control" onChange={handleImageChange} />
                        <label className="form-label" htmlFor="image">Image</label>
                    </div>
                    

                    {/* AVAILABILITY */}
                    <div className="row">
      <div className="col-md-12">
        <h5>Available Time Slots</h5>
        {availableTimeSlots.map((timeSlot, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-3">
              <select
                className="form-select"
                value={timeSlot.day}
                onChange={(e) => {
                  const updatedTimeSlots = [...availableTimeSlots];
                  updatedTimeSlots[index].day = e.target.value;
                  setAvailableTimeSlots(updatedTimeSlots);
                }}
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="time"
                className="form-control"
                value={timeSlot.startTime}
                onChange={(e) => {
                  const updatedTimeSlots = [...availableTimeSlots];
                  updatedTimeSlots[index].startTime = e.target.value;
                  setAvailableTimeSlots(updatedTimeSlots);
                }}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="time"
                className="form-control"
                value={timeSlot.endTime}
                onChange={(e) => {
                  const updatedTimeSlots = [...availableTimeSlots];
                  updatedTimeSlots[index].endTime = e.target.value;
                  setAvailableTimeSlots(updatedTimeSlots);
                }}
                required
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveTimeSlot(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleAddTimeSlot}
        >
          Add Time Slot
        </button>
      </div>
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
  