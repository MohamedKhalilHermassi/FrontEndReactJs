import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const teacherId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(`https://backendexpressjs-2.onrender.com/sessions/teacher/${teacherId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1 className='text-center'>My Courses</h1>
        <table className="table">
          <thead>
            <tr>
            <th>duree</th>

              <th>startDate</th>
              <th>capacity</th>
              <th>level</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>{course.duree}</td>
                <td>{course.startDate}</td>

                <td>{course.capacity}</td>
                <td>{course.level}</td>
                <td>
                  <button
                    onClick={() => navigate(`/studentsList/${course._id}`)}
                    className='btn btn-info'
                  >
                    students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default TeacherCourses;
