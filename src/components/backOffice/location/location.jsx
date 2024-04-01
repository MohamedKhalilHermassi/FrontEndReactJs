import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchLocationById } from '../../../service/locationService';
import classroomIcon from '../../../assets/img/classroom.png';
import musician from '../../../assets/img/musician.png';
import add from '../../../assets/img/add-button.png';
import { available, getClassroomByLocationId, maintenance } from '../../../service/classroomService';

function Location() {
    const {locationId} = useParams();
    const [location, setLocation] = useState({});
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
      fetchLocation(locationId);
      getClassrooms(locationId);
    },[])
    
    const fetchLocation =async (id) => {
      try{
      const data = await fetchLocationById(id);
      setLocation(data);
      } catch (error) {
        console.error(error.message);
    }
    }

    const getClassrooms = async (id) =>{
      try{
      const data = await getClassroomByLocationId(id);
      setClassrooms(data);
      } catch (error) {
        console.error(error.message);
    }
    }

    const setAvailable = async (id) => {
      await available(id);
    }
    const setUnderMaintenance = async (id) => {
      await maintenance(id);
    }

  
    return (
        <>
        {/*<Link to={`/admin/addclassroom/${locationId}`} className='btn'>add Classroom</Link>*/}
<div className="container">
  <div className="row">
      {classrooms.map((classroom, index) =>(   
      <div className="col-md-4"key={index} > 
      <div className="card m-4" >
      {classroom.type === 'Instrument' ?
          (<img src={musician} className="card-img-top h-px-250 w-px-400" alt="classroom icon" />):(
            <img src={classroomIcon} className="card-img-top h-px-250 w-px-400" alt="classroom icon" />)
          }
        <div className="card-body">
          <h5 className="card-title mb-4">Class N°{classroom.number} {classroom.status === 'available' ?
          (<span class="badge bg-label-success ml-5">Available</span>):(
            <span class="badge bg-label-warning ml-5">Under Maintenance</span>
            )
          }</h5>
          <p className="card-text">this class is located in the <span class="badge bg-label-primary">floor N°{classroom.floor}</span> of the establishement located in {location.address} {location.city}
          , <span class="badge bg-label-primary">{location.state}</span> and it's available for <span class="badge bg-label-primary">{classroom.type}</span> courses</p>
          {classroom.status === 'maintenance' ?
          (<a href="#" className="btn btn-success" onClick={setAvailable(classroom._id)}>Available</a>):(
          <a href="#" className="btn btn-warning" onClick={setUnderMaintenance(classroom._id)}>Under Maintenance</a>)
          }
        </div>
      </div>
      </div>
    ))}
        <div className="col-md-4"> 
        <Link to={`/admin/addclassroom/${locationId}`} className="card m-4">
        <img src={add} className="card-img-top" alt="classroom icon" />
        <div className="card-body">
        </div>
      </Link>
      </div>

    {/* Add more cards as needed */}
  </div>
</div>



        </>
    );
}

export default Location