import { render } from "react-dom"
import LandingPage from "./landingPage";
import { NavBar } from "./navbar";
import Footer from "./footer";

function Header()
{
return(
    <>


  <header className="header-2 skew-separator">
    <NavBar></NavBar>
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

  <LandingPage></LandingPage>


  <Footer></Footer>
  








    </>
)
} export default Header;
