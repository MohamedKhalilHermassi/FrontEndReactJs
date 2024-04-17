import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SessionAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: '',
    duree: '',
    level: '',
    course: '',
    teacher: '',
    classroom: ''
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await fetch('http://localhost:3000/classrooms');
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/sessions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
       

      });
      const data = await response.json();
      console.log(data); 

     
      setFormData({
        startDate: '',
        duree: '',
        level: '',
        course: '',
        teacher: '',
        classroom: ''
      });
      navigate('/admin/listS');

    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Start Date:</label>
        <input type="datetime-local" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Duration (in minutes):</label>
        <input type="number" className="form-control" name="duree" value={formData.duree} onChange={handleChange} step="30" min="30" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Level:</label>
        <select className="form-select" name="level" value={formData.level} onChange={handleChange} required>
          <option value="">Select a level</option>
          {[...Array(7).keys()].map(level => (
            <option key={level + 1} value={level + 1}>{level + 1}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Course:</label>
        <select className="form-select" name="course" value={formData.course} onChange={handleChange} required>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Teacher:</label>
        <select className="form-select" name="teacher" value={formData.teacher} onChange={handleChange} required>
          <option value="">Select a teacher</option>
          {teachers.map(teacher => (
            <option key={teacher._id} value={teacher._id}>{teacher.fullname}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Classroom:</label>
        <select className="form-select" name="classroom" value={formData.classroom} onChange={handleChange} required>
          <option value="">Select a classroom</option>
          {classrooms.map(classroom => (
            <option key={classroom._id} value={classroom._id}>{classroom.number}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Session</button>
    </form>
  );
}

export default SessionAdd;
