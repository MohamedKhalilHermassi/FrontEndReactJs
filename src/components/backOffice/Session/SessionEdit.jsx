import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './sessionadd.css';
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const SessionEdit = () => {
  const { id } = useParams();
  const [session, setSession] = useState({
    startDate: new Date(),
    duree: '',
    courseId: '',
    courses: [],
  });
  const [startDateError, setStartDateError] = useState('');
  const [dureeError, setDureeError] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionResponse = await fetch(`https://backendexpressjsback.onrender.com/sessions/${id}`);
        const sessionData = await sessionResponse.json();
        const coursesResponse = await fetch('https://backendexpressjsback.onrender.com/courses');
        const coursesData = await coursesResponse.json();
    
    console.log(sessionData) ;
        setSession({
          startDate: new Date(sessionData.startDate),
          duree: sessionData.duree,
          courseId:sessionData.course,
          courses: coursesData,
        });
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSession();
  }, [id]);

  const handleChange = (date) => {
    setSession(prevSession => ({ ...prevSession, startDate: date }));
    const currentDate = new Date();
    const startDateError = date < currentDate ? 'Start date cannot be before current date' : '';
    setStartDateError(startDateError);
  };

  useEffect(() => {
    const formValid = !startDateError && !dureeError;
    setFormValid(formValid);
  }, [startDateError, dureeError, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    if (session.startDate < currentDate) {
      setStartDateError('Start date cannot be before current date');
      return; // Exit function early if start date is before current date
    }
    try {
      const response = await fetch(`https://backendexpressjsback.onrender.com/sessions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: session.startDate,
          duree: session.duree,
          courseId: session.courseId,
        }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Session updated successfully!', {
        style: {
          width: '500px',
          height: '50px',
        },
        duration: 2000,
      });
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  return (
    <div className="session-add-container">
      <h2>Edit Session</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date and Time:
          <DatePicker
            selected={session.startDate}
            onChange={handleChange}
            showTimeSelect
            dateFormat="Pp"
            required
          />
        </label>
        {startDateError && (
          <p className="error-message" style={{ color: 'red' }}>{startDateError}</p>
        )}
        <br />
        <label>
          Duration (minutes):
          <input
            type="number"
            name="duree"
            value={session.duree}
            onChange={(e) => setSession({ ...session, duree: e.target.value })}
            required
            step="30"
            min="0"
          />
        </label>
        <br />
        <label>
          Course:
          <select
            name="courseId"
            value={session.courseId}
            onChange={(e) => setSession({ ...session, courseId: e.target.value })}
            required
          >
             <option value="">Select a course </option>
            {session.courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" disabled={!formValid}>
          Update Session
        </button>
      </form>
    </div>
  );
};

export default SessionEdit;
