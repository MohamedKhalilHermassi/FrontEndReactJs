import { useState, useEffect } from 'react';
import ReclamtionService from '../service/reclamtionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Reclamtions()
{
    const [error, setError] = useState(null);
    const [ReclamtionData, setReclamtionData] = useState(null);
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
                                <p className="card-text">Status: {reclamation.status}</p>
                                {reclamation.status === 'pending' && (
                                    <>
                                        <button className="btn btn-primary me-2">
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button className="btn btn-danger">
                                            <i className="fas fa-trash-alt"></i> Delete
                                        </button>
                                    </>
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
    </section>
    )
}export default Reclamtions