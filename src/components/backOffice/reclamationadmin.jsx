import { useState, useEffect } from 'react';
import ReclamtionService from '../../service/reclamtionService';
function reclamationadmin()
{
    const [ReclamtionData, setReclamtionData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const recla = await ReclamtionService.getAllReclamations();
            setReclamtionData(recla);
         
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        };
    
        fetchData();
      }, []);
      const formatDateOfBirth = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`;
      };
      const handle = async (id) => {
        try {
           const a= await ReclamtionService.resolving(id);
           console.log(a)
            window.location.reload();
        } catch (error) {
            console.error( error);

        }
    };
    return (
     
    <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Reclamtions /</span> </h4>

             
              <div className="card">
                <h5 className="card-header">Table Reclamtions</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Reclamtion</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {ReclamtionData ? (
                    <tbody className="table-border-bottom-0">
                    {ReclamtionData.map(reclamation => (
                      <tr key={reclamation._id}>
                        <td> <strong>{reclamation.message}</strong></td>
                        <td>{formatDateOfBirth(reclamation.date)}</td>
                       
                        <td> {reclamation.status !== 'pending' && ( <span className="badge bg-label-success me-1">{reclamation.status}</span>)}
                                {reclamation.status === 'pending' && ( <span className="badge bg-label-warning me-1">{reclamation.status}</span>)}
                        </td>
                        <td>
                        {reclamation.status === 'pending' && (
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <button className="dropdown-item" onClick={() => handle(reclamation._id)} 
                                ><i className="bx bx-edit-alt me-1"></i> Mark it Resolved</button>
                             
                            </div>
                          </div>)}
                        </td>
                      </tr>  ))}
                      
                    </tbody>
                     ) : (
                        <tbody className="table-border-bottom-0">
                             <tr>
                                <td>You have no reclamations.</td>
                             </tr>
                       
                        </tbody>
                    )}
                  </table>
                </div>
              </div>
              </div>
              </div>
       
    )
}export default reclamationadmin