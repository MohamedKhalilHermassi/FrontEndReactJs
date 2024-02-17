import { render } from "react-dom"

function Header()
{
return(
    <>


  <header className="header-2 skew-separator">
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
            <li className="nav-item"><a className="nav-link" href="javascript:;">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="javascript:;">Schedule</a></li>
            <li className="nav-item"><a className="nav-link" href="javascript:;">Market Place</a></li>
            <li className="nav-item"><a className="nav-link" href="javascript:;">Events</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item"><a className="nav-link" href="https://twitter.com/CreativeTim"><i className="fab fa-twitter" /></a></li>
            <li className="nav-item"><a className="nav-link" href="https://www.facebook.com/CreativeTim"><i className="fab fa-facebook-square" /></a></li>
            <li className="nav-item"><a className="nav-link" href="https://www.instagram.com/CreativeTimOfficial"><i className="fab fa-instagram" /></a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="page-header">
      <div className="page-header-image" style={{backgroundImage: 'url("images/best-acoustic-guitar.jpg")'}} />
      <div className="container pt-300">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <h2 className="display-2">ElKindy Conservatory</h2>
          </div>
        </div>
        <div className="row">
          <div className="floating-box bg-default">
            <div className="box text-center">
              <div className="icon icon-shape bg-success icon-xl rounded-circle text-white"><i className="ni ni-spaceship" /></div>
            </div>
            <h2 className="lead text-white p-5">As a result of growing greenhouse gas emissions, climate models predict that our planet will get significantly warmer, that ecosystems will be changed or destroyed, and that enormous human and economic costs will be incurred. These scenarios aren’t guaranteed, but avoiding them will be very hard. We’re trying to take small steps to mitigate our impact.</h2>
          </div>
        </div>
      </div>
    </div>
  </header>



  








    </>
)
} export default Header