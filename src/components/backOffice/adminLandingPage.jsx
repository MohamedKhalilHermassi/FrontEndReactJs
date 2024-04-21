import React, { useState, useEffect } from 'react';
import UserService from '../../service/userService'; 

const AdminLandingPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await UserService.getAllUsers();
        setUserData(users.filter(user => user.role !== 'admin'));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBanUser = async (email, status) => {
    try {
      await UserService.banuser(email);
      location.reload();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredUsers = userData.filter(user =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [email, setEmail] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [phone, setphone] = useState('');
    const [birthday, setbirthday] = useState('');
    const [adress, setadress] = useState('');
    const [password, setPassword] = useState('');
    const [image, setimage] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  
   
    const validateName = (name) => {
        const regex = /^[a-zA-Z ]{1,15}$/;
        return regex.test(name);
      };
      const handleRemoveTimeSlot = (index) => {
        const updatedTimeSlots = availableTimeSlots.filter((_, i) => i !== index);
        setAvailableTimeSlots(updatedTimeSlots);
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
      const areAllFieldsFilled = () => {
        return (
          email &&
          Firstname &&
          Lastname &&
          phone &&
          birthday &&
          adress &&
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
 
      const handleAddTimeSlot = () => {
        const newTimeSlot = { startTime: '', endTime: '' };
      
        newTimeSlot.startTime = new Date();
        newTimeSlot.endTime = new Date();
        console.log(newTimeSlot);
        setAvailableTimeSlots([...availableTimeSlots, newTimeSlot]);
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
  formData.append('address', adress);
  formData.append('phone', phone);
  formData.append('birthday', birthday);
  formData.append('image', image);
  const availableTimeJSON = JSON.stringify(availableTimeSlots);
  formData.append('availableTime', availableTimeJSON);
            const newuser = await UserService.addtetcher(formData);
            location.reload();
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

  return (
    <div>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-lg-12 mb-4 order-0">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Search ! 🎉</h5>
                    <div className="navbar-nav align-items-center">
                      <div className="mb-4 d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0" />
                        <input 
                          type="text" 
                          className="form-control border-0 shadow-none" 
                          placeholder="Search..." 
                          aria-label="Search..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Fullname</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.email}>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              <button className={`btn ${user.status ? 'btn-danger' : 'btn-success'}`} onClick={() => handleBanUser(user.email)}>
                                {user.status ? 'Ban' : 'Unban'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-5 text-center text-sm-left">
                  <div className="card-body pb-0 px-0 px-md-4">
                    <img src="backoffice/assets/img/illustrations/man-with-laptop-light.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                    <div className="text-center">
                      <button type="button" className="btn"  style={{ backgroundColor: 'transparent' }} data-toggle="modal" data-target="#exampleModal">
                      Add teacher
                      </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add teacher</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body text-center">
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
                        <input type="text" id="Address" className="form-control" value={adress} onChange={(event) => setadress(event.target.value)}/>
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
                      {error ? "Fix errors" : "Ok"}
                      </button>
                      {error && <p className="text-center text-danger">{error}</p>}
        </div>
      </form>
    </div>
  </div>
</div>
    </div> 
  );
};

export default AdminLandingPage;
