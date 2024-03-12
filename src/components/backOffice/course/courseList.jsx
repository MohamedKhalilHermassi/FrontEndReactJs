import React, { useEffect, useState } from 'react'
import { deleteCourse, fetchCourses } from '../../../service/courseService';
import CourseDetails from './courseDetails';
import toast from 'react-hot-toast';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchData();
        console.log(courses);
    },[])

    const fetchData = async () => {
      try {
          const coursesData = await fetchCourses();
          setCourses(coursesData);
      } catch (error) {
          console.error(error.message);
      }
  };

  const handleDelete = async (courseId) => {
    try {
        await deleteCourse(courseId);
        fetchData();
        toast('Course Deleted!', {
          icon: '🗑️',
          style:{
            width:'275px',
            height:'50px'
          },
          duration: 2000
        });
    } catch (error) {
      toast.error(error.message)
    }
};

  return (
    <>
<div className="row">
    {courses.map((course, index) =>(
  <div className="col-md-4 mt-3">
    <div key={index} className="card p-3 mb-2 w-100 h-100">
      <div className="d-flex justify-content-between">
<div className="view view-cascade overlay">
  <img className="card-img-top" src={`http://localhost:3000/images/${course.image}`} alt="Card image cap" />
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
        <CourseDetails course = {course}/>
        <button className='btn btn-danger mt-3 ml-auto' onClick={(e) => handleDelete(course._id)}>delete</button>
      </div>
    </div>
  </div>))}
</div>

    </>
  )
}

export default CourseList