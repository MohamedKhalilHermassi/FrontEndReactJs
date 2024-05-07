import React, { useState, useEffect } from 'react';
import UserService from '../../service/userService'; 
import { LineChart, PieChart,BarChart } from '@mui/x-charts';

const AdminLandingPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const [loader, setloader] =useState(false);
  const [usersByRole, setusersByRole] = useState([]);
  const [ageRanges, setageRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await UserService.getAllUsers();
        setusersByRole(calculateUsersByRole(users));
        setageRanges(calculateAgeRanges(users));
        setUserData(users.filter(user => user.role !== 'admin'));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const getColorForRole = (role) => {
    switch (role) {
      case 'Student':
        return "#7e82fe"; 
      case 'teacher':
        return '#28cdef'; 
      case 'admin':
        return '#c4ccd5'; 
      default:
        return '#000'; 
    }
  };
  const calculateUsersByRole = (users) => {
    const usersByRole = {
      Student: 0,
      teacher: 0,
      admin: 0
    };
  
    users.forEach((user) => {
      usersByRole[user.role]++;
    });
  
    return usersByRole;
  };

  // Fonction pour calculer les tranches d'âge des utilisateurs
  const calculateAgeRanges = (users) => {
    const ageRanges = {
      '0-18': 0,
      '19-30': 0,
      '31-50': 0,
      '51+': 0
    };
  
    const currentDate = new Date();
  
    users.forEach((user) => {
      const age = currentDate.getFullYear() - new Date(user.birthday).getFullYear();
      if (age <= 18) {
        ageRanges['0-18']++;
      } else if (age <= 30) {
        ageRanges['19-30']++;
      } else if (age <= 50) {
        ageRanges['31-50']++;
      } else {
        ageRanges['51+']++;
      }
    });
  
    return ageRanges;
  };
  
  console.log(usersByRole)
  console.log(ageRanges)
  const handleBanUser = async (email, status) => {
    try {
      setloader(true);
      await UserService.banuser(email);
      setloader(false);
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

  
   
    
    const [passwordtouched, setpasswordtouched] = useState(false);
    const [birthdaytouched, setbirthdaytouched] = useState(false);
    const [phonetouched, setphonetouched] = useState(false);
    const [Lastnametouched, setLastnametouched] = useState(false);
    const [Firstnametouched, setFirstnametouched] = useState(false);
    const [emailtouched, setemailtouched] = useState(false);
    const validateFirstName = (name) => {
      if(Firstnametouched){
        const regex = /^[a-zA-Z ]{1,15}$/;
        return regex.test(name);
      }else return true; 
      };
      const handleRemoveTimeSlot = (index) => {
        const updatedTimeSlots = availableTimeSlots.filter((_, i) => i !== index);
        setAvailableTimeSlots(updatedTimeSlots);
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
          adress &&
          password &&
          image
        );
      };
      const validateBirthday = (birthday) => {
        if(birthdaytouched){
          const today = new Date();
          const birthdayDate = new Date(birthday);
          const fiveYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          
       
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
 
      const handleAddTimeSlot = () => {
        const newTimeSlot = { startTime: '', endTime: '' };
      
        newTimeSlot.startTime = new Date();
        newTimeSlot.endTime = new Date();
        console.log(newTimeSlot);
        setAvailableTimeSlots([...availableTimeSlots, newTimeSlot]);
      };
      const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstnametouched(true);
    setLastnametouched(true);
    setemailtouched(true);
    setbirthdaytouched(true);
    setphonetouched(true);
    setpasswordtouched(true);
    setError(null); 
    let isValid = true;
    for (const timeSlot of availableTimeSlots) {
      if (timeSlot.startTime >= timeSlot.endTime) {
          setError("End time must be greater than start time for all time slots");
          isValid = false;
          break;
      }
  }
    
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
  setloader(true);
            const newuser = await UserService.addtetcher(formData);
            setloader(false);
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

      const getColorForAgeRange = (ageRange) => {
        switch (ageRange) {
          case '0-18':
            return '#7e82fe';
          case '19-30':
            return '#28cdef';
          case '31-50':
            return '#c4ccd5';
          case '51+':
            return '#d4dcdc';
          default:
            return '#000000';
        }
      };
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
    <div className="content-wrapper">
    {loader && ( 
          <div className="loader-popup" >
          <div className="loader-content" >
              <div className="loader-container">
                  <div className="loader"></div>
              </div>
          </div>
      </div>
        )}
       
       
        
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-lg-6 mb-4 order-0">
                <div className="card" style={{height:"360px"}}>
                <h5 class="card-header m-0 me-2 pb-3">Type of Users</h5>
                <PieChart
  series={[
    {
      data: Object.entries(usersByRole).map(([role, count]) => ({
        name: role,
        value: count,
        label: `${role} (${count})`, 
        color: getColorForRole(role), 
      })),
    },
  ]}
  width={400}
  height={200}
/>
                </div>
              </div>
              <div className="col-lg-6 mb-4 order-0">
                <div className="card">
                <h5 class="card-header m-0 me-2 pb-3">Ages of Users</h5>
                <BarChart
  xAxis={[{ scaleType: 'band', data: ['0-18', '19-30', '31-50', '51+'] }]}
  series={[
    {
      data: Object.values(ageRanges),
      color: ['#7e82fe', '#28cdef', '#c4ccd5', '#7e82fe']
    },
  ]}
  width={500}
  height={300}
/>
              
                </div>
              </div>
            </div>
        </div>
       
      <div className="container-xxl flex-grow-1 ">
        <div className="row">
          
          <div className="col-lg-12 mb-4 order-0">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Search ! 🎉</h5>
                    <div className="col-sm-5 text-center text-sm-left">
                 
                </div>
                    <div className="navbar-nav align-items-center">
                      <div className="mb-4 d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0" />
                        <div className='row'>
                          <div className='col-6'>
                          <input 
                          type="text" 
                          className="form-control border-0 shadow-none" 
                          placeholder="Search..." 
                          aria-label="Search..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        /></div>
                          </div>
                          <div className='col-6' style={{paddingLeft: '400px'}}>
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
          {currentUsers.map(user => (
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
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(userData.length / usersPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
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
                        <label className="form-label" htmlFor="form3Example3">Date of birth { !validateBirthday(birthday) && <span className="text-danger"> (Sorry, the minimum age to enroll in the conservatory as a teatcher is 18 years old)</span> }</label>
                      </div>
                      {/* adress input */}
                      <div className="form-outline mb-4">
                        <input type="text" id="Address" className="form-control" value={adress} onChange={(event) => setadress(event.target.value)}/>
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
                        <input type="file" id="image" className="custom-file" onChange={handleImageChange} />
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
