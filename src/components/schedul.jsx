import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar CSS
import moment from 'moment';
import Modal from 'react-modal'; // Import modal library
import { jwtDecode } from 'jwt-decode';
import guitarImage from '../../public/images/guitar.png'; 
import pianoImage from '../../public/images/piano.png'; // Import the image for the Piano course
import closeIcon from '../../public/images/close.png'; // Import the close button image

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      selectedDate: new Date(),
      courses: [], // Added courses state to store courses data
      courseImages: {
        Guitar: guitarImage, // Map course name to image URL
        Piano: pianoImage // Add mapping for Piano course
      },
      showModal: false, // State to control modal visibility
      courseDescription: '', // State to store course description
      courseType: '', // State to store course type
      courseLevel: '', // State to store course level
      selectedCourse: '', // State to store the selected course
      userRole : '' , 
      enrolledUsers: [] ,
      sessionId : '',
      userId : localStorage.getItem('id')
     
    };
  }

  componentDidMount() {
    this.fetchSessions();
    this.fetchCourses(); // Fetch courses data
    this.fetchUserRole(); // Fetch user role
  }

  fetchUserRole = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.setState({ userRole: decodedToken.role });
    }
  }

  handleEventDrop = async (event) => {
    try {
      const { _id, start, end } = event;
      const response = await fetch(`http://localhost:3000/sessions/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start, end })
      });
      if (response.ok) {
        // Session updated successfully
        console.log('Session updated successfully');
      } else {
        // Failed to update session
        console.error('Failed to update session');
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  }

  fetchSessions = async () => {
    try {
      const response = await fetch('http://localhost:3000/sessions');
      const sessionsData = await response.json();

      // Fetch courses separately
      const coursesResponse = await fetch('http://localhost:3000/courses');
      const coursesData = await coursesResponse.json();

      // Map sessions and include course information
      const sessionsWithCourse = sessionsData.map(session => {
        const course = coursesData.find(course => course._id === session.course);
        const courseName = course ? course.name : '';
        return {
          ...session,
          title: courseName,
          start: new Date(session.startDate),
          end: moment(session.startDate).add(session.duree, 'minutes').toDate()
        };
      });

      this.setState({ sessions: sessionsWithCourse });
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  }

  fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/courses');
      const data = await response.json();
      this.setState({ courses: data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleEventClick = async (event) => {
    const { courses } = this.state;
    const selectedCourse = courses.find(course => course.name === event.title);
    if (selectedCourse) {
      try {
        const response = await fetch(`http://localhost:3000/sessions/bycourse/${selectedCourse._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        const sessionData = await response.json();
        
        // Ensure sessionData is an array and contains at least one session
        if (!Array.isArray(sessionData) || sessionData.length === 0) {
          throw new Error('No session data found');
        }
        
        // Select the first session and extract its _id
        const sessionId = sessionData[0]._id;
        
        // Retrieve enrolled user data
        const enrolledUserIds = sessionData[0].users || [];
        const userPromises = enrolledUserIds.map(async userId => {
          const userResponse = await fetch(`http://localhost:3000/users/user/${userId}`);
          if (!userResponse.ok) {
            throw new Error(`Failed to fetch user data for user ID: ${userId}`);
          }
          return userResponse.json();
        });
        const userDataArray = await Promise.all(userPromises);
        const userNames = userDataArray.map(userData => userData.name);
  
        // Set modal state with session and user data
        this.setState({ 
          showModal: true, 
          courseDescription: selectedCourse.description,
          courseType: selectedCourse.courseType,
          courseLevel: selectedCourse.level,
          selectedCourse: event.title,
          enrolledUsers: userNames,
          sessionId: sessionId
        });
      } catch (error) {
        console.error('Error fetching session data:', error);
        // Optionally handle error here
      }
    }
  }
  
  
  
  
  
  
  

  handleCloseModal = () => {
    // Close modal when modal is clicked
    this.setState({ showModal: false });
  }

  handleJoindreClick = async (sessionId) => { // Accept sessionId as a parameter
    try {
      const studentId = localStorage.getItem('id'); // Assuming the user ID is stored in localStorage
      const response = await fetch(`http://localhost:3000/users/user/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const userRole = userData.role;
      
      // Check if the user role is 'Student'
      if (userRole !== 'Student') {
        console.log('Only students can join sessions');
        return; // Exit the method if the user is not a student
      }
  
      const joinResponse = await fetch(`http://localhost:3000/sessions/join/${sessionId}/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (joinResponse.ok) {
        console.log('User joined the session successfully');
        // Optionally, you can update the state or show a success message here
      } else {
        console.error('Failed to join the session');
        // Optionally, you can show an error message here
      }
    } catch (error) {
      console.error('Error joining session:', error);
      // Optionally, you can show an error message here
    }
  }

  render() {
    const localizer = momentLocalizer(moment);
    const { selectedCourse, courseDescription, courseType, courseLevel, showModal, courseImages, userRole, sessions } = this.state;
    console.log(this.state);

    return (
      <div style={{ maxWidth: '90vw', margin: 'auto', background: 'linear-gradient(to bottom, #283593, #673AB7)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#fff' }}>Session List</h2>
        <Calendar
          localizer={localizer}
          events={this.state.sessions}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, borderRadius: '10px', overflow: 'hidden', color: '#fff' }} // Adjust the height as needed
          onSelectDate={this.handleDateChange} // Call handleDateChange when a date is selected
          eventPropGetter={(event) => ({
            style: {
              backgroundImage: `url(${this.state.courseImages[event.title]})`,
              backgroundSize: 'cover',
              backgroundPositionX: '2px',
              backgroundPositionY: '24px',
              borderRadius: '5px'
            }
          })}
          onSelectEvent={this.handleEventClick} // Call handleEventClick when an event is clicked
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: 'transparent', // Set transparent background for days
            }
          })}
          defaultView="week" // Set the default view to 'week'
          components={{
            month: {
              dateHeader: ({ label }) => {
                return <span style={{ color: '#fff' }}>{label}</span>; // Set white color for day labels
              }
            },
            toolbar: (props) => {
                return (
                  <div className="rbc-toolbar">
                    <span className="rbc-btn-group">
                      <button type="button" onClick={() => props.onNavigate('TODAY')} className="rbc-btn" style={{ color: '#fff' }}>
                        Today
                      </button>
                      <button type="button" onClick={() => props.onNavigate('PREV')} className="rbc-btn" style={{ color: '#fff' }}>
                        Back
                      </button>
                      <button type="button" onClick={() => props.onNavigate('NEXT')} className="rbc-btn" style={{ color: '#fff' }}>
                        Next
                      </button>
                    </span>
                    <span className="rbc-toolbar-label" style={{ color: '#fff' }}>{props.label}</span>
                    <span className="rbc-btn-group">
                      <button type="button" onClick={() => props.onView('month')} className="rbc-btn" style={{ color: '#fff' }}>
                        Month
                      </button>
                      <button type="button" onClick={() => props.onView('week')} className="rbc-btn" style={{ color: '#fff' }}>
                        Week
                      </button>
                      <button type="button" onClick={() => props.onView('day')} className="rbc-btn" style={{ color: '#fff' }}>
                        Day
                      </button>
                      <button type="button" onClick={() => props.onView('agenda')} className="rbc-btn" style={{ color: '#fff' }}>
                        Agenda
                      </button>
                    </span>
                  </div>
                );
              }
          }}
        />
        {/* Modal */}
        <Modal
          isOpen={showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Course Picture Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999 // Ensure the modal is displayed on top
            },
            content: {
              width: '50%',
              height: '50%',
              margin: 'auto',
              border: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {selectedCourse && (
              <>
                <img src={courseImages[selectedCourse]} alt={selectedCourse} style={{ width: '70%', height: '100%' }} />
                <p style={{ color: '#000', marginTop: '10px' }}>Description: {courseDescription}</p>
                <p style={{ color: '#000' }}>Type: {courseType}</p>
                <p style={{ color: '#000' }}>Level: {courseLevel}</p>
              </>
            )}
            {/* Close button */}
            <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', width: '20px', height: '20px' }} onClick={this.handleCloseModal} />
            {/* Joindre button */}
            {userRole === 'Student' && (
  <button class="btn btn-success" style={{ color: 'green' }} onClick={() => this.handleJoindreClick(this.state.sessionId)}>Joindre</button>
)}

          </div>
        </Modal>
      </div>
    );
  }
}

export default Schedule;
