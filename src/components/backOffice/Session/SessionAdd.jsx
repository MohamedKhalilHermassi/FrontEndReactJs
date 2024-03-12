import React, { Component } from 'react';
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';


class SessionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      duree: '',
      userId: '',
      courseId: '',
      courses: [],
      startDateError: '',
      dureeError: '',
      formValid: false // Add formValid state to manage overall form validity
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/courses');
      const data = await response.json();
      this.setState({ courses: data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  validateForm = () => {
    const { startDateError, dureeError } = this.state;
    return !startDateError && !dureeError; // Return the validity status
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const startDateError = selectedDate < currentDate ? 'Start date cannot be before current date' : '';
      this.setState({ startDateError }, () => {
        this.setState({ formValid: this.validateForm() }); // Update form validity after setting state
      });
    } else if (name === 'duree') {
      const dureeValue = parseInt(value, 10);
      const dureeError = isNaN(dureeValue) || dureeValue <= 0 ? 'Duration must be a non-negative number or equal 0' : '';
      this.setState({ dureeError }, () => {
        this.setState({ formValid: this.validateForm() }); // Update form validity after setting state
      });
    }
    this.setState({ [name]: value });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/sessions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      const data = await response.json();
      console.log(data);
      toast.success('Course added successfully!',
        {
          style:{
            width:'500px',
            height:'50px'
          },
          duration: 2000
        }
      )
      // Handle success response
    } catch (error) {
      console.error('Error:', error);
      console.log('Toast should be displayed'); // Add console log
      toast.error('An error occurred while adding the session.',
        {
          style:{
            width:'500px',
            height:'50px'
          },
          duration: 2000
        }
      ); // Call toast.error() to display the toast notification
    }
  }

  render() {
    const { startDateError, dureeError, formValid } = this.state;
    return (
      <div className="session-add-container">
        <h2>Add Session</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Start Date and Time:
            <input
              type="datetime-local"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
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
              value={this.state.duree}
              onChange={this.handleChange}
              required
              step="30"
              min="0"
            />
          </label>
          {dureeError && (
            <p className="error-message" style={{ color: 'red' }}>{dureeError}</p>
          )}
          <br />
          <label>
            Course:
            <select
              name="courseId"
              value={this.state.courseId}
              onChange={this.handleChange}
              required
            >
              <option value="">Select Course</option>
              {this.state.courses.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit" disabled={!formValid}>Add Session</button>
        </form>
      </div>
    );
  }
}

export default SessionAdd;
