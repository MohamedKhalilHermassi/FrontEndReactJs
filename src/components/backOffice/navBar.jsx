import SideBar from './sideBar'
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../service/userService';
import  { useState,useEffect } from 'react';
const NavBar = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notification, setNotification] = useState([]);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('userToken');
   
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await UserService.getUser(localStorage.getItem('email'));
        user.image = user.image.replace(/\\/g, '/'); 
        setUserData(user);
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
    const socket = socketIOClient('http://localhost:3000'); 
    
    socket.on('Reclamation', (reclamationData) => {
      setUnreadNotifications(unreadNotifications + 1); 
      setNotification([reclamationData]); 
      console.log(notification)
  });

    
  return () => {
    socket.off('Reclamation');
  };
}, [unreadNotifications, notification]);
  const handleLogOutClick =  () => {
     UserService.logout();
     window.location.href = '/';
   
  };
  const handleNotificationClick = () => {
    if (seen) {
      // Si les notifications sont déjà vues, réinitialiser les valeurs
      setNotification(null);
      setUnreadNotifications(0);
      setSeen(false);
    } else {
      // Si les notifications ne sont pas vues, marquer comme vues
      setSeen(true);
    }
  
  };
 
  return (
    <>
                {/* Navbar */}
                <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
          <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a className="nav-item nav-link px-0 me-xl-4" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <i className="bx bx-menu bx-sm" />
            </a>
          </div>
          <div className="dropdown">
      <button className="btn btn-link" onClick={handleNotificationClick} id="dropdownMenuButtonn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-bell"></i>
        { <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">{unreadNotifications}</span>}
      </button>
      
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonn">
           {notification ? (
          <ul >
         
           
              <li className='dropdown-item' >{notification}</li>
            
          </ul>
             ) : (
              <ul >
              <li className='dropdown-item'>You have no Notification.</li>
              </ul>
                
          )}
        </div>
    
      
    </div>
          <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            {/* Search */}
           
            {/* /Search */}
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              {/* User */}
              <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                  <div className="avatar avatar-online">
                  {userData ? (
                    <img src={`http://localhost:3000/${userData.image}`} alt="" className="w-px-40 h-auto rounded-circle" />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar avatar-online">
                          {userData ? (
                    <img src={`http://localhost:3000/${userData.image}`} alt="" className="w-px-40 h-auto rounded-circle" />
                    ) : (
                      <p>Loading...</p>
                    )}
                          </div>
                        </div>
                        {userData ? (
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block">{userData.fullname}</span>
                          <small className="text-muted">{userData.email}</small>
                        </div>
                          ) : (
                            <p>Loading...</p>
                          )}
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' ><Link to="editadmin">
                    <i className="bx bx-user me-2" />
                      <span className="align-middle">My Profile</span>
                    </Link>
                    
                    </a>
                  </li>
                 
                 
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                    
                    <button type="button" className="dropdown-item" onClick={handleLogOutClick}>
                    <i className="bx bx-power-off me-2" />
                      <span className="align-middle">Log Out</span>
      </button>
                  </li>
                </ul>
              </li>
              {/*/ User */}
            </ul>
          </div>
        </nav>
        <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <SideBar/>
  </div>
        
        {/* / Navbar */}
    </>
  )
}

export default NavBar