import axios from 'axios'
import React, { useEffect, useState } from 'react'
import school from '../../../assets/img/classe.png'

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APIURL+'courses')
        .then(result => setCourses(result.data))
        .catch(err => console.log(err))
    },[courses])

const handleDelete = (id) => {
    console.log(id);
    axios.delete(import.meta.env.VITE_APIURL+'courses/'+id)
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
<div className="view view-cascade overlay">
  <img className="card-img-top" src={school} alt="Card image cap" />
  <a href="#!">
    <div className="mask rgba-white-slight waves-effect waves-light" />
  </a>
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