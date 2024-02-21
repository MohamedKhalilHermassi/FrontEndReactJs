import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signin');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-absolute">
    <div className="container">
      <div className="navbar-translate">
        <a className="navbar-brand" href="javascript:;"><img src="images/Untitled-1.png" alt width={100} /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#example-header-2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      <div className="collapse navbar-collapse" id="example-header-2">
        <div className="navbar-collapse-header">
          <div className="row">
            <div className="col-6 collapse-brand">
              <a>
                Argon
                <span>PRO</span>
              </a>
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
          <li className="nav-item"><a className="nav-link" href="javascript:;"><Link to="/">Home</Link></a></li>
          <li className="nav-item"><a className="nav-link" href="javascript:;"><Link to="/courses">Courses</Link></a></li>
          <li className="nav-item"><a className="nav-link" href="javascript:;"><Link to="/events">Events</Link></a></li>
          <li className="nav-item"><a className="nav-link" href="javascript:;">Schedule</a></li>
          <li className="nav-item"><a className="nav-link" href="javascript:;">Market Place</a></li>
          
        </ul>
        <ul className="nav navbar-nav navbar-right">
        <button type="button" className="btn btn-warning btn-sm rounded-pill" onClick={handleClick}>Create Account</button>


          <li className="nav-item"><a className="nav-link" href="https://twitter.com/CreativeTim"><i className="fab fa-twitter" /></a></li>
          <li className="nav-item"><a className="nav-link" href="https://www.facebook.com/CreativeTim"><i className="fab fa-facebook-square" /></a></li>
          <li className="nav-item"><a className="nav-link" href="https://www.instagram.com/CreativeTimOfficial"><i className="fab fa-instagram" /></a></li>
        </ul>
      </div>
      
    </div>
    
  </nav>
  
  
  )
}
