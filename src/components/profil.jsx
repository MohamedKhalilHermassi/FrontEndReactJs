import { useState, useEffect } from 'react';

import UserService from '../service/userService';

function Profile() {
  const [userData, setUserData] = useState(null);


  const [phone, setphone] = useState('');
  const [birthday, setbirthday] = useState('');
  const [adress, setadress] = useState('');
  const [image, setimage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await UserService.getUser(localStorage.getItem('email'));
        user.image = user.image.replace(/\\/g, '/'); // Assurez-vous de mettre à jour l'image dans l'état
        setUserData(user);
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  
  const formatDateOfBirth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };
  
 
    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setimage(imageFile);
    };
  
    const validatePhone = (phone) => {
      const regex = /^\d{8}$/;
      return regex.test(phone);
    };
    
    const validateBirthday = (birthday) => {
      const today = new Date();
      const birthdayDate = new Date(birthday);
      const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
      
   
      return birthdayDate <= fiveYearsAgo;
    };
  
   
const handleSubmit = async (event) => {
  event.preventDefault();
  setError(null); 
  let isValid = true;

    if (!validatePhone(phone)&&phone!='') {
      isValid = false;
    }

    if (!validateBirthday(birthday)&&birthday!='') {
      isValid = false;
    }

    if (isValid) {
      try {
          setIsLoading(true);
          const formData = new FormData();
if(adress!=''){
    formData.append('address', adress);
}
if(phone!=''){
    formData.append('phone', phone);
}
if(birthday!=''){
    formData.append('birthday', birthday);
}
if(image!=''){
    formData.append('image', image);
}



          const newuser = await UserService.updateUser(localStorage.getItem('email'),formData);
            window.location.href = '/Profil';
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
    }};
  return (
    <>
      {userData ? (
        <div className="vh-100" style={{ backgroundColor: '#f8f9fa', marginTop: '50px' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border rounded shadow-sm">
                <div className="card-body text-center">
                  <img src={`http://localhost:3000/${userData.image}`} alt="Profile" className="rounded-circle img-fluid mb-3" style={{ width: '150px' }} />
                  <h4 className="mb-2">{userData.fullname}</h4>
                  <p className="text-muted mb-4">{userData.email}</p>
                  <div className="row">
                    <div className="col">
                      <p className="mb-1">Address:</p>
                      <p className="text-muted">{userData.address}</p>
                    </div>
                    <div className="col">
                      <p className="mb-1">Phone:</p>
                      <p className="text-muted">{userData.phone}</p>
                    </div>
                    <div className="col">
                      <p className="mb-1">Date of Birth:</p>
                      <p className="text-muted">{formatDateOfBirth(userData.birthday)}</p>
                    </div>
                  
                  </div>
                  <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit Profile</button>
                </div>
              
                <div className="col">
                      <p className="mb-1">Membership Expiration:</p>
                      <p className="text-muted">{formatDateOfBirth(userData.expirePayementDate)}</p>
                    </div>
                    <div className="col">
                      <p className="mb-1">Last Payement made:</p>
                      <p className="text-muted">{formatDateOfBirth(userData.lastPaymentDate)}</p>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ) : (
        <p>Loading...</p>
      )}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
                      
                       {/* phone input */}
                       <div className="form-outline mb-4">
                        <input type="number" id="phone" className="form-control" value={phone} onChange={(event) => setphone(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">phone { !validatePhone(phone) && <span className="text-danger"> (Phone number must be 8 digits)</span> }</label>
                      </div>
                      {/* birthday input */}
                     
                      {/* adress input */}
                      <div className="form-outline mb-4">
                        <input type="text" id="Address" className="form-control" value={adress} onChange={(event) => setadress(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="file" id="image" className="form-control" onChange={handleImageChange} />
                        <label className="form-label" htmlFor="image">Image</label>
                    </div>
                      {/* Submit button */}
                      <button type="submit" className="btn btn-warning btn-block mb-4" >
                      {error ? "Fix errors" : "Edit"}
                      </button>
                      {error && <p className="text-center text-danger">{error}</p>}
                      </form>
      </div>
     
    </div>
  </div>
</div>
    </>
  );
}

export default Profile;
