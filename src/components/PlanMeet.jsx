import * as React from 'react';
import { useState, useEffect } from 'react';
import UserService from '../service/userService';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}
function PlanMeet()
{
    const [userData, setUserData] = useState(null);
    const [Url, setUrl] = useState(null);
    const [date, setdate] = useState(null);
    const [role, setrole] = useState(null);
    const [ListeEmails, setListeEmails] = useState([]);
    const [Students, setStudents] = useState([]);
    const [loader, setloader] =useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setloader(true);
            const user = await UserService.getUser(localStorage.getItem('email'));
            setloader(false);
            setUserData(user);
            setrole(user.role);
           
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
      }, []);
      useEffect(() => {
        const fetchDatastudents = async () => {
          try {
            setloader(true);
            const datastudents = await UserService.getStudents();
            setloader(false);
            setStudents(datastudents);
           
           
          } catch (error) {
            console.error('Error fetching students data:', error);
          }
        };
    
        fetchDatastudents();
      }, []);
      const addtolist= (email)=>{
        setListeEmails((prevEmails) => [...prevEmails, email]);
      }
      const removeFromList = (emailToRemove) => {
        setListeEmails((prevEmails) => prevEmails.filter(email => email !== emailToRemove));
      };
      const filteredUsers = Students.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); 
        let isValid = true;
        console.log(ListeEmails)
        if (!Url &&Url==null) {
            isValid = false;
            setError("Please fill the Url for the meet");
          }
      
          if (ListeEmails.length==0) {
            isValid = false;
            setError("You didnt select any student to join the meet");
          }
      
          if (!date&&date==null) {
            isValid = false;
            setError("You didnt select the date for the meet");
          }
          if (isValid) {
            try {
                
                const data = {
                    emails: ListeEmails,
                    url: Url,
                    date: date,
                    name: userData.fullname
                  };


                
                setloader(true);
                const response = await UserService.SendUrlMeet(data);
                setloader(false);
                
             } catch (error) {
                setloader(false);
                if(error.message=="Request failed with status code 302"){
                  setError("email exist");
                }else if(error.message=="Request failed with status code 400"){
                  setError("please check your coordinates");
                }else{
                  setError(error.message);
                }
                
              } finally {
                setloader(false); 
             }
          }}
    const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     
      const appID = 1606731501;
      const serverSecret = "d8d0365d6f8042ada2fda02857b4799f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  userData.fullname);
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, 
        },
      });


  };

    return (
        <>
        <div>
        {loader && ( 
          <div className="loader-popup" >
          <div className="loader-content" >
              <div className="loader-container">
                  <div className="loader"></div>
              </div>
          </div>
      </div>
        )}
        </div>
        {role=='teacher' && (
        <div className='container-xxl flex-grow-1 container-p-y' style={{marginTop:'10%'}}>
        <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title " style={{color:'#feaa00'}}>Students</h5>
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
                          <th>Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.email}>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>
                            {ListeEmails.includes(user.email) ? (
        <button className="btn" style={{backgroundColor:"#feaa00",color:'white'}} onClick={() => removeFromList(user.email)}>
          Remove
        </button>
      ) : (
        <button className="btn" style={{backgroundColor:"#feaa00",color:'white'}} onClick={() => addtolist(user.email)}>
          Add
        </button>
      )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-5 text-center text-sm-left">
                  <div className="card-body pb-0 px-0 px-md-4">
                    <img src="backoffice/assets/img/illustrations/Design_sans_titre-removebg-preview.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                    <div className="text-center">
                      <button type="button" className="btn"  style={{ backgroundColor: 'transparent' }} data-toggle="modal" data-target="#exampleModal">
                      Invite
                      </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        )}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Fix Date</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body text-center">
                      <div className="form-outline mb-4">
                        <input type="date" id="Date of birth" className="form-control" value={date} onChange={(event) => {setdate(event.target.value)}}/>
                        <label className="form-label" htmlFor="form3Example3">Date</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="Url" className="form-control" value={Url} onChange={(event) => {setUrl(event.target.value)}}/>
                        <label className="form-label" htmlFor="form3Example3">Url</label>
                      </div>
                      <button type="submit" className="btn btn-warning btn-block mb-4" >
                      {error ? "Fix errors" : "Validate"}
                      </button>
                      {error && <p className="text-center text-danger">{error}</p>}
        </div>
      </form>
    </div>
    </div></div>
     <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
        </>
    )
}export default PlanMeet