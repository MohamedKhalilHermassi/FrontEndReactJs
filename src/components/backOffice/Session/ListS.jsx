import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListS.css'; // Import custom CSS file
import { format } from 'date-fns'; 
class ListS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      courses: {} // Add a state to store course details
    };
  }

  async componentDidMount() {
    try {
      // Fetch sessions
      const sessionsResponse = await fetch('http://localhost:3000/sessions');
      let sessionsData = await sessionsResponse.json();
  
      // Sort sessions by start date
      sessionsData = sessionsData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      
      // Fetch courses
      const coursesResponse = await fetch('http://localhost:3000/courses');
      const coursesData = await coursesResponse.json();
      
      // Convert courses data to object for easier access
      const coursesObject = {};
      coursesData.forEach(course => {
        coursesObject[course._id] = course;
      });
  
      // Update state with sorted sessions and courses
      this.setState({ sessions: sessionsData, courses: coursesObject });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleEdit = (id) => {
    this.props.navigate(`/admin/editSession/${id}`);
  }

  handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/sessions/${id}`, {
        method: 'DELETE'
      });
      this.setState(prevState => ({
        sessions: prevState.sessions.filter(session => session._id !== id)
      }));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  render() {
    return (
      <div>
        <h2>Session List</h2>
        <table className="session-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Duration</th>
              <th>Course</th>
              <th>Capacity</th>

              <th>Level</th>
              <th>Classroom</th>
              <th>Floor</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            {this.state.sessions.map(session => (
              <tr key={session._id}>
                  <td>{format(new Date(session.startDate), 'MMMM dd, yyyy HH:mm:ss')}</td>
                <td>{session.duree}</td>
                {/* Display course name instead of ID */}
                <td>{session.course.name} </td>
                <td>{session.capacity} </td>
                <td>{session.level} </td>

                <td>
                  
              number°  {session.classroom?.number}
                </td>
                <td>
                {session.classroom?.floor}

                </td>
                <td>
              {session.classroom?.location.address}, {session.classroom?.location.city}

                </td>
                <td>
                  <button onClick={() => this.handleEdit(session._id)}>Edit</button>
                  <button onClick={() => this.handleDelete(session._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function ListSWrapper() {
  const navigate = useNavigate();
  return <ListS navigate={navigate} />;
}

export default ListSWrapper;
