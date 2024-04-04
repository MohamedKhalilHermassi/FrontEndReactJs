import { Link } from 'react-router-dom';
function Acceuil()
{
    return(
<>

<div className="page-header ">
              <div className="page-header-image reduced-opacity" style={{backgroundImage: 'url("images/best-acoustic-guitar.jpg")'}} />
              <div className="container pt-300">
                    <div className="row">
                                <div className="col-md-8 mx-auto text-center">
                                <h1 className="display-1 text-center text-secondary" style={{ 
  fontSize: '72px', 
  background: '-webkit-linear-gradient(#066fbf, #fcb45c)', 
  WebkitBackgroundClip: 'text', 
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ajout d'une ombre portée
  padding: '20px', // Ajout de marge intérieure pour l'espace autour du texte
  borderRadius: '10px' // Ajout de coins arrondis pour le conteneur
}}>
  ElKindy Conservatory
</h1>

        </div>
      </div>
      <div className="row">
        <div className="floating-box bg-gradient-dark ">
          <div className="box text-center">
            <div className="icon icon-shape bg-warning icon-xl rounded-circle text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/>
  <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/>
  <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/>
</svg></div>
          </div>
          <h2 className="lead text-center text-white p-5"> Embark on a journey of artistic discovery within the vibrant halls of our conservatory, where passion meets proficiency</h2>
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
         
          <h3 className="display-3">Unleash Your Potential</h3>
          <p className="lead">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle"><i className="ni ni-settings-gear-65" /></div>
            <h6 className="info-title text-uppercase text-primary">Simplicity</h6>
            <p className="description opacity-8">We believe in providing a user-friendly experience that focuses on clarity and ease of navigation.</p>
           
          </div>
        </div>
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle"><i className="ni ni-atom" /></div>
            <h6 className="info-title text-uppercase text-success">Performance</h6>
            <p className="description opacity-8">Ensuring that users have a seamless and efficient experience when accessing our platform.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info">
            <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle"><i className="ni ni-world" /></div>
            <h6 className="info-title text-uppercase text-warning">Quality </h6>
            <p className="description opacity-8">We maintain a high standard of content quality, curating a rich and diverse collection of musical offerings, educational materials, and community.</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>



</>


    )

        
    
} export default Acceuil;