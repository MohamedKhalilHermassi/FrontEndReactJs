import Footer from "./footer";
import { NavBar } from "./navbar";

function Events()
{
    return (
        <>
        <NavBar></NavBar>
     <section className="section blogs-1">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-8">
          <br />
          <h3 className="display-3">Our recent writings</h3>
          <p className="lead mt-1">The time is now for it to be okay to be great. People in this world shun people for being great.</p>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-3">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/theme/josh-appel.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">New Challenges</h6>
                  <h5 className="card-title">Touch on a trend</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/theme/john-hoang.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">New Opportunities</h6>
                  <h5 className="card-title">Constantly growing</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/theme/kit-suman.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">Sales Leads</h6>
                  <h5 className="card-title">Configure Blockchain Technology</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/sections/damian.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">AI at the Edge</h6>
                  <h5 className="card-title">Research Byte</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/sections/ashim.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">Spectrum</h6>
                  <h5 className="card-title">Data Virtualization</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-blog card-background" data-animation="zooming">
            <div className="full-background" style={{backgroundImage: 'url("https://app.creative-tim.com/argon_placeholder/sections/odin.jpg")'}} />
            <a href="javascript:;">
              <div className="card-body">
                <div className="content-bottom">
                  <h6 className="card-category text-white opacity-8">Touch on a trend</h6>
                  <h5 className="card-title">New Challenges</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <button className="btn btn-icon btn-primary mt-4" type="button">
        <span className="btn-inner--text">Show more</span>
        <span className="btn-inner--icon"><i className="ni ni-bold-right" /></span>
      </button>
    </div>
  </section>
        </>
    )
} export default Events;
