import { Link, useNavigate } from 'react-router-dom'; 
function Acceuil()
{
    return(
<>

<div className="page-header ">
              <div className="page-header-image reduced-opacity" style={{backgroundImage: 'url("images/best-acoustic-guitar.jpg")'}} />
              <div className="container pt-300">
                    <div className="row">
                                <div className="col-md-8 mx-auto text-center">
          <h1 className="display-1 text-orange">ElKindy Conservatory</h1>
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

<div className="section features-1">
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
        <br />
       
          <span className="badge badge-primary badge-pill mb-3">Insight</span>
         
          <h3 className="display-3">Full-Funnel Social Analytics</h3>
          <p className="lead">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle"><i className="ni ni-settings-gear-65" /></div>
            <h6 className="info-title text-uppercase text-primary">Social Conversations</h6>
            <p className="description opacity-8">We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
            <a className="text-primary" ><Link to="/">
              <span className="mr-1">More about us</span>
              <i className="ni ni-bold-right text-primary" /></Link>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle"><i className="ni ni-atom" /></div>
            <h6 className="info-title text-uppercase text-success">Analyze Performance</h6>
            <p className="description opacity-8">Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.</p>
            <a className="text-primary" ><Link to="/">
              <span className="mr-1">Learn about our products</span>
              <i className="ni ni-bold-right text-primary" /></Link>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle"><i className="ni ni-world" /></div>
            <h6 className="info-title text-uppercase text-warning">Measure Conversions</h6>
            <p className="description opacity-8">What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.</p>
            <a className="text-primary" ><Link to="/">
              <span className="mr-1">Check our documentation</span>
              <i className="ni ni-bold-right text-primary" /></Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>



</>


    )

        
    
} export default Acceuil;