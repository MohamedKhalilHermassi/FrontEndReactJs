import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APIURL+'courses')
        .then(result => setCourses(result.data))
        .catch(err => console.log(err))
    },[])

const handleDelete = (id) => {
    console.log(id);
    axios.delete(import.meta.env.VITE_APIURL+'courses/np'+id)
    .then(res => console.log(res))
    .catch(err =>console.log(err));
}

  return (
    <>
<div className="row">
    {courses.map((course, index) =>(
  <div className="col-md-4 mt-3">
    <div key={index} className="card p-3 mb-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="icon"> <i class="fas fa-school"></i> </div>
          <div className="ms-2 c-details">
            <h6 className="mb-0">{course.courseType}</h6> {/*<span>1 days ago</span>*/}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="heading">{course.name}</h3>
        <div className="mt-5">
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
          </div>
          <div className="mt-3"> <span className="text1">32 Applied <span className="text2">of 50 capacity</span></span> </div>
        </div>
        <button className="btn btn-primary mt-3">View Details</button>
        <button className='btn btn-danger mt-3 ml-auto' onClick={(e) => handleDelete(course._id)}>delete</button>
      </div>
    </div>
  </div>))}
</div>

    </>
  )
}

export default CourseList