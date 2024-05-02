import React, { useEffect, useState } from 'react'
import { fetchCourseByStudentId, fetchCourseByTeacherId } from '../service/courseService';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function MyCourses() {

    const [courses, setCourses] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const decodedToken = jwtDecode(token);
        fetchData(decodedToken.id, decodedToken.role);
        setRole(decodedToken.role);
    },[])

    const fetchData = async (id,role) => {
        let coursesData;
        try {
            if(role == 'Student'){
            coursesData = await fetchCourseByStudentId(id);
        }else {
            coursesData = await fetchCourseByTeacherId(id);
        }
        setCourses(coursesData);
        } catch (error) {
            console.error(error.message);
        }
    };

  return (
<div className='container py-5'>
<div className="table-responsive my-5">
  <table className="table">
    <thead>
      <tr>
        <th>Course</th>
        {role === 'Student' && <th>Teacher</th>}
        <th>Level</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {courses.map((course,index) =>
      <tr key={index}>
        <td> <span className="fw-medium">{course.name}</span></td>
        {role === 'Student' && <td>{course.teacher.fullname}</td>}
        <td>
        <span class="badge bg-label-primary">{course.level}</span>
        </td>
        <td>
        {role === 'teacher' && (
        <Link to={`/add-session/${course._id}`}>   
  <button type="button" class="btn-sm btn-primary">Schedule a session</button>
</Link>
        )}
        </td>
        <td>
        {role === 'Student' && (
        <Link to={`/schedule`}>   
  <button type="button" class="btn-sm btn-primary">Choose  the session</button>
</Link>
        )}
        </td>
      </tr>
    )}
    </tbody>
  </table>
</div>
</div>

  )
}

export default MyCourses