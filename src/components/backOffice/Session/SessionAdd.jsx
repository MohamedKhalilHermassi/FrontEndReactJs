import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const SessionAdd = () => {
  const [startDate, setStartDate] = useState('');
  const [duree, setDuree] = useState('');
  const [usersId] = useState(localStorage.getItem('id'));
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [startDateError, setStartDateError] = useState('');
  const [dureeError, setDureeError] = useState('');
  const [formValid, setFormValid] = useState(false);

  const params = useParams() ;
  useEffect(() => {
     const id = params.id ; 
     setCourseId(id) ;
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const validateForm = () => {
    return !startDateError && !dureeError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const error = selectedDate < currentDate ? 'Start date cannot be before current date' : '';
      setStartDateError(error);
      setFormValid(error === '' && dureeError === '');
    } else if (name === 'duree') {
      const dureeValue = parseInt(value, 10);
      const error = isNaN(dureeValue) || dureeValue <= 0 ? 'Duration must be a non-negative number or equal 0' : '';
      setDureeError(error);
      setFormValid(startDateError === '' && error === '');
    }
    if (name === 'courseId') {
      setCourseId(value);
    }
    if (name === 'startDate') {
      setStartDate(value);
    }
    if (name === 'duree') {
      setDuree(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('http://localhost:3000/sessions/add', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ startDate, duree, usersId, courseId }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Course added successfully!', {
        style: {
          width: '500px',
          height: '50px',
        },
        duration: 2000,
      });
    } catch (error) {
      console.error('Error:', error);
      console.log('Toast should be displayed');
      toast.error('An error occurred while adding the session.', {
        style: {
          width: '500px',
          height: '50px',
        },
        duration: 2000,
      });
    }
  };
    
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="session-add-container">
        <h2>Add Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Start Date and Time:
            <input
              type="datetime-local"
              name="startDate"
              value={startDate}
              onChange={handleChange}
              required
            />
          </label>
          {startDateError && <p className="error-message" style={{ color: 'red' }}>{startDateError}</p>}
          <br />
          <label>
            Duration (minutes):
            <input
              type="number"
              name="duree"
              value={duree}
              onChange={handleChange}
              required
              step="30"
              min="0"
            />
          </label>
          {dureeError && <p className="error-message" style={{ color: 'red' }}>{dureeError}</p>}
          <br />
          <label>
            Course:
            <select
              name="courseId"
              value={courseId}
              onChange={handleChange}
              required
              disabled
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit" disabled={!formValid}>Add Session</button>
        </form>
      </div>
    </>
  );
};

export default SessionAdd;
