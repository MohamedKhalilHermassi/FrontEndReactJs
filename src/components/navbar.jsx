import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../service/userService';
import { jwtDecode } from 'jwt-decode';

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [decodedToken,setDecodedToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setDecodedToken(decodedToken);
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleLogOutClick = () => {
    UserService.logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-absolute">
      <div className="container">
        <div className="navbar-translate">
        <img src="images/Untitled-1.png" alt="Elkindy" width={150} />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#example-header-2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="example-header-2">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-brand">
              </div>
              <div className="col-6 collapse-close text-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#example-header-2" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
          <ul className="navbar-nav mx-auto">
            {isLoggedIn && decodedToken.paid===true &&  (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Profile
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/profil" className="dropdown-item">My Profile</Link>
                    <Link to="/myproducts" className="dropdown-item">My Products</Link>
                    <Link to="/myorders" className="dropdown-item">My Orders</Link>
                    <Link to="/mybooks" className="dropdown-item">My Books</Link>
                    <Link to="/chat" className="dropdown-item">Chatroom</Link>
                    <Link to="/chatbot" className="dropdown-item">ChatBot</Link>
                    <Link to="/mycourses" className="dropdown-item">My Courses</Link><Link to="/reclamation" className="dropdown-item">My Reclamtions</Link>
                    <Link to="/myevents" className="dropdown-item">My Events</Link>
                    <Link to="/mymarks" className="dropdown-item">My Marks</Link>
                  
                  </div>
                </li>
            )}
            {isLoggedIn && userRole === 'teacher' && ( // Check userRole here
              <>
              <li className="nav-item"><a className="nav-link" ><Link to="/add-session">Add Session</Link></a></li>
              <li className="nav-item"><a className="nav-link" ><Link to="/teachercourses">My Courses</Link></a></li>
              <li className="nav-item"><a className="nav-link" ><Link to="/PlanMeet">Plan Meet</Link></a></li>

              </>
            )}
          
            <li className="nav-item"><a className="nav-link" ><Link to="/">Home</Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="/courses">Courses</Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="/events">Events</Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="/schedule">Schedule</Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="/marketplace">Marketplace</Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="/bookstore">Book Store</Link></a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
       
                  
        &nbsp;
        &nbsp;
            {!isLoggedIn && (
              <button type="button" className="btn btn-warning btn-sm rounded-pill" onClick={handleSignInClick}>
                Sign In
              </button>
            )}
            {isLoggedIn && (
              <button type="button" className="btn btn-warning btn-sm rounded-pill" onClick={handleLogOutClick}>
                Log Out
              </button>
            )}
            <li className="nav-item"><a className="nav-link" ><Link to="https://twitter.com/CreativeTim"><i className="fab fa-twitter" /></Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="https://www.facebook.com/ConservatoireElkindy/?locale=fr_FR"><i className="fab fa-facebook-square" /></Link></a></li>
            <li className="nav-item"><a className="nav-link" ><Link to="https://www.instagram.com/CreativeTimOfficial"><i className="fab fa-instagram" /></Link></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
