import React, { useEffect, useState } from 'react'
import { deleteCourse, fetchCourses } from '../../../service/courseService';
import CourseDetails from './courseDetails';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { replace } from 'formik';

const CourseList = () => {
  const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const courseTypes = ['Instrument', 'Solfege'];

    useEffect(() => {
        fetchData();
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
<div className='row'>
<div className="my-3 ml-5 w-50">
          <label for="defaultFormControlInput" className="form-label" >Type</label>
          <div className="input-group input-group-merge">
            <select id="select2Basic" name='courseType' className="select2 form-select form-select-lg" data-allow-clear="true" onChange={(e) =>setType(e.target.value)}>
            <option value="">Select a course type</option>
            {courseTypes.map((item, index) => (
                <option key={index} value={item}>{item}</option>
            ))}
            </select>
          </div>
        </div>
        </div>
    {courses.filter((course) => {
        return (type === '')
          ? course
          :(course.courseType == type)
      }).map((course, index) =>(
  <div className="col-md-4 mt-3">
    <div key={index} className="card p-3 mb-2 w-100 h-100">
      <div className="d-flex justify-content-between">
<div className="view view-cascade overlay">
  <img className="card-img-top" src={`https://backendexpressjsback.onrender.com/images/${course.image}`} alt="Card image cap" />
  <a href="#!">
    <div className="mask rgba-white-slight waves-effect waves-light" />
  </a>
</div>

      </div>
      <div className="mt-5">
        <h3 className="heading">{course.name}</h3>
        <div className="mt-5">
        <span><i class="fa-solid fa-graduation-cap"> </i></span> you have {course.students.length} students enrolled in this course
        
        </div>
        <CourseDetails course = {course}/>
        <button className='btn btn-secondary mt-3 ml-auto' onClick={(e) => handleDelete(course._id)}>delete</button>
        <button className='btn btn-warning mt-3 ml-auto' onClick={(e) => navigate(`/admin/courseView/${course._id}`)}>manage</button>

      </div>
    </div>
  </div>))}
</div>

    </>
  )
}

export default CourseList