import { useState, useEffect } from 'react';
import ReclamtionService from '../../service/reclamtionService';
import { PieChart } from '@mui/x-charts/PieChart';
function reclamationadmin()
{
    const [ReclamtionData, setReclamtionData] = useState(null);
    const [percentages, setPercentages] = useState([0, 0, 0, 0]);
    const [filess, setFiless] = useState([]);
    const [other, setOthers] = useState('');
    const [resp, setResp] = useState('');
    const [idd, setIdd] = useState('');
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
    
    useEffect(() => {
      if (ReclamtionData) {
        const totalCount = ReclamtionData.length;
        const typeCounts = {
          techniques: 0,
          administrative: 0,
          Communication: 0,
          other: 0
        };
    
        ReclamtionData.forEach(reclamation => {
          typeCounts[reclamation.typereclamtion]++;
        });
    
        const newPercentages = [
          typeCounts.techniques / totalCount,
          typeCounts.administrative / totalCount,
          typeCounts.Communication / totalCount,
          typeCounts.other / totalCount
        ];
    
        setPercentages(newPercentages);
        console.log(percentages)
      }
    }, [ReclamtionData]);
  
     
      const formatDateOfBirth = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`;
      };
      const handle = async () => {
        try {
           const a= await ReclamtionService.resolving(idd,resp);
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
              
                    <div className="pie-chart" style={{ paddingLeft:'30%', paddingBottom:'2%' }}>
                    <PieChart 
  series={[
    {
      data: [
        { id: 0, value: percentages[0] * 100, label: 'techniques',color: '#7e82fe' },
        { id: 1, value: percentages[1] * 100, label: 'administrative',color: '#28cdef' },
        { id: 2, value: percentages[2] * 100, label: 'communication' ,color: '#c4ccd5'},
        { id: 3, value: percentages[3] * 100, label: 'other',color: '#d4dcdc' },
      ],
    },
  ]}
  width={400}
  height={200}
  radialLabelsLinkOffset={8} // Espacement entre le pie chart et les libellés radiaux
  slicesLabelsRadiusOffset={5}
  margin={{ left: -60}}
/>

                    </div>
                
              <div className="card">
                <h5 className="card-header">Table Reclamtions</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                      <th>User Name</th>
                        <th>Reclamtion</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {ReclamtionData ? (
                    <tbody className="table-border-bottom-0">
                    {ReclamtionData.map(reclamation => (
                      <tr key={reclamation._id}>
                        <td> <strong>{reclamation.user.fullname}</strong></td>
                        <td> <strong>{reclamation.message}</strong></td>
                        <td>{reclamation.typereclamtion}</td>
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
                              <button className="dropdown-item" data-toggle="modal" data-target="#resolveModal" onClick={() => setIdd(reclamation._id)} 
                                ><i className="bx bx-edit-alt me-1"></i> Mark it Resolved</button>
                                <button className="dropdown-item" data-toggle="modal" data-target="#editModal" onClick={() => {setFiless(reclamation.files); setOthers(reclamation.otherreclamtion)}} 
                                ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.364 6.635a4.007 4.007 0 0 0-5.658 0L8.172 11.17a2.484 2.484 0 0 0-.733 1.77a2.498 2.498 0 0 0 2.501 2.498c.64 0 1.279-.242 1.767-.73l2.122-2.121a2.002 2.002 0 0 0 0-2.828l-3.536 3.535a.5.5 0 0 1-.708-.708l4.535-4.537a2.006 2.006 0 0 1 2.83 0a2.003 2.003 0 0 1 0 2.828l-4.537 4.537l-2.535 2.535a2.003 2.003 0 0 1-2.828 0a2.001 2.001 0 0 1 0-2.828l.095-.096a3.566 3.566 0 0 1-.702-2.125l-.807.807a4.003 4.003 0 0 0 0 5.656c.779.779 1.804 1.17 2.828 1.17s2.049-.391 2.828-1.17l7.072-7.072a4.003 4.003 0 0 0 0-5.656"></path></svg> Show more </button>
                             
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
                  <div className="modal fade" id="resolveModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Send Response</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
                        <input type="text" id="Address" className="form-control" value={resp} onChange={(event) => setResp(event.target.value)}/>
                        <label className="form-label" htmlFor="form3Example3">Response</label>
                      </div>
                      <button type="submit" className="btn btn-warning btn-block mb-4" onClick={() => handle()}  >
                      Ok
                      </button>
      </div>
      </div>
      </div>
      </div>
                  <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">More info</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div>
  {filess &&filess.map(file => (
    <div key={file}>
      <img src={`http://localhost:3000/${file}`} alt="Profile" className="img-fluid mb-3" style={{ width: '150px' }} />
    </div>
  ))}
  { filess === null && (
    <p className='text-center'>There are no files in this reclamtion.</p>
  )}
</div>
<div>
{other  && (
    <p className='text-center'>Other Description :{other}</p>
  )}
</div>
     
    </div>
  </div>
</div></div>
                </div>
              </div>
              </div>
    
              </div>
       
    )
}export default reclamationadmin