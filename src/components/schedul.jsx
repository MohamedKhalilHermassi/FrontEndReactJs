import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar CSS
import moment from 'moment';
import Modal from 'react-modal'; // Import modal library
import { jwtDecode } from 'jwt-decode';
import guitarImage from '../../public/images/guitar.png'; 
import pianoImage from '../../public/images/piano.png'; // Import the image for the Piano course
import closeIcon from '../../public/images/close.png'; // Import the close button image
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify css
import NotPaid from './subscription/NotPaid';
const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courses, setCourses] = useState([]); // Added courses state to store courses data
  const [courseImages, setCourseImages] = useState({
    Guitar: guitarImage, // Map course name to image URL
    Piano: pianoImage // Add mapping for Piano course
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [courseDescription, setCourseDescription] = useState(''); // State to store course description
  const [courseType, setCourseType] = useState(''); // State to store course type
  const [courseLevel, setCourseLevel] = useState(''); // State to store course level
  const [selectedCourse, setSelectedCourse] = useState(''); // State to store the selected course
  const [userRole, setUserRole] = useState(''); // State to store user role
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const userId = localStorage.getItem('id');
  const [decodedToken,setDecodedToken] = useState('');

  useEffect(() => {
    fetchSessions();
    fetchCourses(); // Fetch courses data
    fetchUserRole(); // Fetch user role
  }, []);

  const fetchUserRole = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecodedToken(decodedToken);
      setUserRole(decodedToken.role);
    }
    

  };

  const handleEventDrop = async (event) => {
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
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch('http://localhost:3000/sessions');
      const sessionsData = await response.json();
  
      // Fetch courses separately
      const coursesResponse = await fetch('http://localhost:3000/courses');
      const coursesData = await coursesResponse.json();
  
      // Fetch classrooms separately
      const classroomsResponse = await fetch('http://localhost:3000/classrooms');
      const classroomsData = await classroomsResponse.json();
  
      // Map sessions and include course and classroom information
      const sessionsWithCourseAndClassroom = sessionsData.map(session => {
        const course = coursesData.find(course => course._id === session.course);
        const classroom = classroomsData.find(classroom => classroom._id === session.classroom);
        const courseName = course ? course.name : '';
        return {
          ...session,
          title: courseName,
          start: new Date(session.startDate),
          end: moment(session.startDate).add(session.duree, 'minutes').toDate(),
          classroom: classroom // Add classroom information to session
        };
      });
  
      setSessions(sessionsWithCourseAndClassroom);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };
  
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = async (event) => {
    const { _id } = event;
    console.log(_id) ;
    console.log(event) ;
    const selectedCourse = courses.find(course => course._id === event.course);
     console.log(selectedCourse)
    if (selectedCourse) {
      try {
        const response = await fetch(`http://localhost:3000/sessions/${_id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        
        const sessionData = await response.json();
        console.log('Session Data:', sessionData); // Log session data
  
        // Ensure sessionData is an array and contains at least one session
       
  
        // Select the first session and extract its _id
        const { _id: sessionId, users: enrolledUserIds } = sessionData;
           console.log(sessionData)
        console.log('Enrolled User IDs:', enrolledUserIds); // Log enrolled user IDs
  
        // Retrieve user data for each enrolled user
        const userPromises = enrolledUserIds.map(async userId => {
          const userResponse = await fetch(`http://localhost:3000/users/user/${userId}`);
          
          if (!userResponse.ok) {
            throw new Error(`Failed to fetch user data for user ID: ${userId}`);
          }
          
          return userResponse.json();
        });
  
        const userDataArray = await Promise.all(userPromises);
        console.log('User Data Array:', userDataArray); // Log user data array
  
        // Extract user names from user data array
        const userNames = userDataArray.map(userData => userData.fullname);
        console.log('User Names:', userNames); // Log user names
  
        // Set modal state with session and user data
        setShowModal(true);
        setCourseDescription(selectedCourse.description);
        setCourseType(selectedCourse.courseType);
        setCourseLevel(selectedCourse.level);
        setSelectedCourse(event.title);
        setEnrolledUsers(userNames);
        setSessionId(sessionId);
      } catch (error) {
        console.error('Error fetching session data:', error);
        // Optionally handle error here
      }
    }
  };
  

  const handleCloseModal = () => {
    // Close modal when modal is clicked
    setShowModal(false);
  };

  const handleJoindreClick = async (sessionId) => { // Accept sessionId as a parameter
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
        toast.success("You have joined successfully!"); 

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
  };

  const localizer = momentLocalizer(moment);

  return (
    <>
        {decodedToken.role=="Student" &&  decodedToken.paid === false ? (
      <NotPaid></NotPaid>

     ) : (
       <>
    <div style={{ maxWidth: '90vw', margin: 'auto', background: 'linear-gradient(to bottom, #283593, #ffab00)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
      <h2 style={{ color: '#fff' }}>Session List</h2>
      <Calendar
        localizer={localizer}
        events={sessions}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, borderRadius: '10px', overflow: 'hidden', color: '#fff' }} // Adjust the height as needed
        onSelectDate={handleDateChange} // Call handleDateChange when a date is selected
        eventPropGetter={(event) => ({
          style: {
            backgroundImage: `url(${courseImages[event.title]})`,
            backgroundSize: 'cover',
            backgroundPositionX: '2px',
            backgroundPositionY: '24px',
            borderRadius: '5px'
          }
        })}
        onSelectEvent={handleEventClick} // Call handleEventClick when an event is clicked
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
        onRequestClose={handleCloseModal}
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
<>
<div>Classroom n°: </div>
              {sessionId && (
                  <>
                 <p style={{ color: '#000' }}>Location: {
                 sessions.find(session => session._id === sessionId)?.classroom?.number || 'N/A'
                 }</p>
                  </>
                    )}
</>

              {enrolledUsers && enrolledUsers.length > 0 && (
                <div>
                  <p style={{ color: '#000' }}>Enrolled Users:</p>
                  <ul>
                    <li key={0}>Teacher is: {enrolledUsers[0]}</li>
                    {enrolledUsers.slice(1).map((userName, index) => (
                      <li key={index + 1}>{userName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {/* Close button */}
          <img src={closeIcon} alt="Close" style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', width: '20px', height: '20px' }} onClick={handleCloseModal} />
          {/* Joindre button */}
          {userRole === 'Student' && (
            <button className="btn btn-success" style={{ color: 'green' }} onClick={() =>
              handleJoindreClick(sessionId)}>Joindre</button>
          )}
        </div>
      </Modal>
    </div>
    </>
        )}
        </>

  );
};

export default Schedule;