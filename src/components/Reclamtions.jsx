import { useState, useEffect } from 'react';
import ReclamtionService from '../service/reclamtionService';
import axios from 'axios';
function Reclamtions()
{
  const BASE_URL =  'https://backendexpressjsback.onrender.com/Reclamtions'; 
    const [error, setError] = useState(null);
    const [ReclamtionData, setReclamtionData] = useState(null);
    const [id, setId] = useState('');
    const [messagee, setMessagee] = useState('');
    const [typereclamtion, setTypereclamtion] = useState('');
    const [otherreclamtion, setOtherreclamtion] = useState('');
    const [images, setImages] = useState([]);
    const [messageedit, setMessageedit] = useState('');
    const [typereclamtion2, setTypereclamtion2] = useState('');
    const [otherreclamtion2, setOtherreclamtion2] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const recla = await ReclamtionService.GetReclamationsForUser(localStorage.getItem('email'));
            setReclamtionData(recla);
         
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        };
    
        fetchData();
      }, []);
      const handleImageChange = (event) => {
        const files = event.target.files;
        const newImagesArray = [];
        for (let i = 0; i < files.length; i++) {
          newImagesArray.push(files[i]);
        }
        // Concaténer les nouvelles images avec les images existantes
        setImages([...images, ...newImagesArray]);
      };
      
    
      const handleImageDelete = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
      };
      const handleadd = async (event) => {
        event.preventDefault();
        setError(null); 
        let isValid = true;
      
        // Validation des champs requis
        if(!messagee){
          isValid = false;
          setError("Message is required");
        }
        if(!typereclamtion){
          isValid = false;
          setError("Type of Reclamation is required");
        }
      
        if(isValid){
          try{
            let formData = new FormData();
            formData.append('email', localStorage.getItem('email'));
            formData.append('message', messagee);
            formData.append('typereclamtion', typereclamtion);
            if(typereclamtion === 'other'){
              formData.append('otherreclamtion', otherreclamtion);
            }
            if(images && images.length > 0){
              for(let i = 0; i < images.length; i++){
                formData.append('images', images[i]);
              }
            }
      
            const token = localStorage.getItem('userToken'); 
            const response = await axios.post(`${BASE_URL}/addreclamation`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            setMessagee('');
            setTypereclamtion('');
            setOtherreclamtion('');
            setImages([]);
            window.location.reload(); // Rafraîchit la page pour afficher la nouvelle réclamation
          } catch (error){
            if(error.response && error.response.status === 400){
              setError("Please check your coordinates");
            } else {
              setError(error.message);
            }
          }
        }
      };
      const handleExistingImageDelete = (index) => {
        const updatedImages = [...existingImages];
        updatedImages.splice(index, 1);
        setExistingImages(updatedImages);
      };
      
    
      const handleNewImagesChange = (event) => {
        const files = event.target.files;
        const newImagesArray = [];
        for (let i = 0; i < files.length; i++) {
          newImagesArray.push(files[i]);
        }
        setNewImages(newImagesArray);
      };
      const handledit = async (event) => {
        event.preventDefault();
        setError('');
        const formData = new FormData();
        formData.append('id', id);
        formData.append('message', messageedit);
        formData.append('typereclamtion',typereclamtion2);
        formData.append('otherreclamtion',otherreclamtion2);
        existingImages.forEach((image) => formData.append('deleteImages', image));
        newImages.forEach((image) => formData.append('images', image));
        
        try {
          const token = localStorage.getItem('userToken');
          const response = await axios.post(`${BASE_URL}/updateReclamation`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          // Réinitialiser les états après la soumission réussie du formulaire
          setId('');
          setMessageedit('');
          setExistingImages([]);
          setNewImages([]);
          setOtherreclamtion2('');
          setTypereclamtion2('');
          window.location.reload(); // Rafraîchir la page pour afficher les mises à jour
        } catch (error) {
          setError(error.message);
        }
      };
              const handleDelete = async (id) => {
                try {
                    await ReclamtionService.deletereclamtion(id);
                    window.location.reload();
                } catch (error) {
                    console.error('Erreur lors de la suppression de la réclamation :', error);

                }
            };
          const formatDateOfBirth = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
            const day = date.getDate().toString().padStart(2, '0'); 
            return `${year}-${month}-${day}`;
          };
    return (
        <section className="section team-2 ">
        <div className="container py-5">
        <h2 className='text-center'>Reclamations</h2>
        {ReclamtionData && ReclamtionData.length > 0 ? (
            <div className="row">
                {ReclamtionData.map(reclamation => (
                    <div key={reclamation._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Date: {formatDateOfBirth(reclamation.date)}</h5>
                                <br></br><br></br><br></br>
                                <p className="card-text">Message: {reclamation.message}</p>
                                {reclamation.status !== 'pending' && ( <p className="card-text">Status: <span className="badge bg-label-success me-1">{reclamation.status}</span></p>)}
                                {reclamation.status === 'pending' && ( <p className="card-text">Status: <span className="badge bg-label-warning me-1">{reclamation.status}</span></p>)}
                                {reclamation.typereclamtion === 'other' && (
                                  <div>
                                  <p className="card-text">Type Reclamtion: <span >{reclamation.typereclamtion}</span></p>
                                  <p className="card-text">Other: <span >{reclamation.otherreclamtion}</span></p>
                                  </div>
                                )}
                                {reclamation.typereclamtion !== 'other' && (
                                  <div>
                                  <p className="card-text">Type Reclamtion: <span>{reclamation.typereclamtion}</span></p>
                                  </div>
                                )}
                                {reclamation.files  && (
                                  <div>
                                    {reclamation.files.map(file => (
                                 <img src={`https://backendexpressjsback.onrender.com/${file}`} alt="Profile" className="img-fluid mb-3" style={{ width: '150px' }} />
                                  ))}
                                  </div>
                                )}
                              {reclamation.status === 'pending' && (
                                    
                                        <button className="btn btn-primary me-2" data-toggle="modal" data-target="#editModal" onClick={() => {
        setId(reclamation._id); setMessageedit(reclamation.message); setExistingImages(reclamation.files); setOtherreclamtion2(reclamation.otherreclamtion); setTypereclamtion2(reclamation.typereclamtion);
    }}>
                                            <i className="fas fa-edit"></i> Edit
                                        </button>)}
                                        {reclamation.status !== 'pending' && (
    <button className="btn btn-danger" onClick={() => handleDelete(reclamation._id)}>
        <i className="fas fa-trash-alt"></i> Delete
    </button>
)}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className='text-center'>You have no reclamations.</p>
        )}
    </div>
    <div className="container d-flex justify-content-center">
    <button className="btn btn-primary me-2" data-toggle="modal" data-target="#exampleModal">Add</button>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header ">
        <h5 className="modal-title " id="exampleModalLabel">Add </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleadd}>                  
  <div className="form-outline mb-4">
    <input type="text" id="messagee" className="form-control" value={messagee} onChange={(event) => setMessagee(event.target.value)} placeholder="Message"/>
  </div>
  <div className="form-outline mb-4">
    <select className="form-control" id="typereclamtion" value={typereclamtion} onChange={(event) => setTypereclamtion(event.target.value)}>
      <option value="techniques">Techniques</option>
      <option value="administrative">Administrative</option>
      <option value="Communication">Communication</option>
      <option value="other">Other</option>
    </select>
  </div>
  {typereclamtion === 'other' && (
    <div className="form-outline mb-4">
      <input type="text" id="otherreclamtion" className="form-control" value={otherreclamtion} onChange={(event) => setOtherreclamtion(event.target.value)} placeholder="Other Reclamation"/>
    </div>
  )}
 <div className="form-outline mb-4">
        <input type="file" id="image" className="form-control" style={{ display: 'none' }} onChange={handleImageChange} multiple />
        <label htmlFor="image" className="btn btn-primary">Add Files</label>
      </div>
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={URL.createObjectURL(image)} className="card-img-top" alt={`Image ${index}`} />
              <div className="card-body">
                <button className="btn btn-danger" onClick={() => handleImageDelete(index)}>
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          </div> ))}
          </div>

  {/* Submit button */}
  <button type="submit" className="btn btn-warning btn-block mb-4">
    {error ? "Fix errors" : "Add"}
  </button>
  {error && <p className="text-center text-danger">{error}</p>}
</form>

      </div>
     
    </div>
  </div>
</div>

<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handledit}>
          <div className="form-outline mb-4">
            <input type="hidden" id="id" value={id} />
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="messageedit">Message</label>
            <input type="text" id="messageedit" className="form-control" value={messageedit} onChange={(event) => setMessageedit(event.target.value)} />
          </div>
          <div className="form-outline mb-4">
    <select className="form-control" id="typereclamtion2" value={typereclamtion2} onChange={(event) => setTypereclamtion2(event.target.value)}>
      <option value="techniques">Techniques</option>
      <option value="administrative">Administrative</option>
      <option value="Communication">Communication</option>
      <option value="other">Other</option>
    </select>
  </div>
  {typereclamtion2 === 'other' && (
    <div className="form-outline mb-4">
      <input type="text" id="otherreclamtion2" className="form-control" value={otherreclamtion2} onChange={(event) => setOtherreclamtion2(event.target.value)} placeholder="Other Reclamation"/>
    </div>
  )}
          
          {/* Bouton de soumission */}
          <button type="submit" className="btn btn-warning btn-block mb-4">
            {error ? "Fix errors" : "Edit"}
          </button>
          {error && <p className="text-center text-danger">{error}</p>}
        </form>
      </div>
     
    </div>
  </div>
</div>
    </section>
    )
}export default Reclamtions