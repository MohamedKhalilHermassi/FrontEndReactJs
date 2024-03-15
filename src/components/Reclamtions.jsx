import { useState, useEffect } from 'react';
import ReclamtionService from '../service/reclamtionService';

function Reclamtions()
{
    const [error, setError] = useState(null);
    const [ReclamtionData, setReclamtionData] = useState(null);
    const [id, setId] = useState('');
    const [messagee, setMessagee] = useState('');
    const [messageedit, setMessageedit] = useState('');
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
      const handleadd = async (event) => {
        event.preventDefault();
        setError(null); 
        let isValid = true;
      
         if(!messagee){
            isValid=false;
            setError("Required Field");
         }
         if(isValid){
            try{
                let reclamtion={
                    email:localStorage.getItem('email'),
                    message:messagee
                }
                const newreclamtion = await ReclamtionService.addreclamation(reclamtion);
                window.location.reload();
            }catch (error){
                if(error.message=="Request failed with status code 400"){
                    setError("please check your coordinates");
                  }else{
                    setError(error.message);
                  }
            }
       
          }};
          const handledit = async (event) => {
            event.preventDefault();
            setError(null); 
            let isValid = true;
          
             if(!messageedit && !id){
                isValid=false;
                setError("Required Field");
             }
             if(isValid){
                try{
                    let reclamtion={
                        id:id,
                        message:messageedit
                    }
                    const newreclamtion = await ReclamtionService.updatereclamation(reclamtion);
                    window.location.reload();
                }catch (error){
                    if(error.message=="Request failed with status code 400"){
                        setError("please check your coordinates");
                      }else{
                        setError(error.message);
                      }
                }
           
              }};
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
        <section className="section team-2 vh-100">
        <div className="container py-5">
        <h2>Reclamations</h2>
        {ReclamtionData ? (
            <div className="row">
                {ReclamtionData.map(reclamation => (
                    <div key={reclamation._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Date: {formatDateOfBirth(reclamation.date)}</h5>
                                <br></br><br></br><br></br>
                                <p className="card-text">Message: {reclamation.message}</p>
                                {reclamation.status !== 'pending' && ( <p className="card-text">Status: <span class="badge bg-label-success me-1">{reclamation.status}</span></p>)}
                                {reclamation.status === 'pending' && ( <p className="card-text">Status: <span class="badge bg-label-warning me-1">{reclamation.status}</span></p>)}
                              {reclamation.status === 'pending' && (
                                    
                                        <button className="btn btn-primary me-2" data-toggle="modal" data-target="#editModal" onClick={() => {
        setId(reclamation._id); setMessageedit(reclamation.message);
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
            <p>You have no reclamations.</p>
        )}
    </div>
    <div className="container ">
    <button className="btn btn-primary me-2" data-toggle="modal" data-target="#exampleModal">Add</button>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleadd}>
                      
                      
                       <div className="form-outline mb-4">
                        <input type="text" id="messagee" className="form-control" value={messagee} onChange={(event) => setMessagee(event.target.value)}/>
                      </div>
                      {/* Submit button */}
                      <button type="submit" className="btn btn-warning btn-block mb-4" >
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
                        <div className="form-outline mb-4" style={{display:'none'}}>
                        <input type="text" id="messagee" className="form-control" value={id} onChange={(event) => setId(event.target.value)}/>
                      </div>
                      
                       <div className="form-outline mb-4">
                        <input type="text" id="messagee" className="form-control" value={messageedit} onChange={(event) => setMessageedit(event.target.value)}/>
                      </div>
                      {/* Submit button */}
                      <button type="submit" className="btn btn-warning btn-block mb-4" >
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