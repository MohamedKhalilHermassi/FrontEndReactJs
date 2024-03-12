import React, { Component } from 'react';
import Calendar from 'react-calendar';
import '../Session/calendar.css'; // Import custom CSS file

class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    this.fetchSessions();
  }

  fetchSessions = async () => {
    try {
      const response = await fetch('http://localhost:3000/sessions'); // Adjust the URL accordingly
      const data = await response.json();
      // Parse startDate string to Date object for each session
      data.forEach(session => {
        session.startDate = new Date(session.startDate);
      });
      this.setState({ sessions: data });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Handle error
    }
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    return (
      <div>
        <h2>Session List</h2>
        <Calendar
          onChange={this.handleDateChange}
          value={this.state.selectedDate}
          className="custom-calendar" // Add custom class name
        />
        <ul>
          {this.state.sessions.map(session => (
            // You can filter sessions based on the selected date
            session.startDate.toDateString() === this.state.selectedDate.toDateString() && (
                <li key={session._id}>
                Start Date: {session.startDate.toString()}, Duration: {session.duree} minutes
                {/* Display other session details as needed */}
              </li>
            )
          ))}
        </ul>
      </div>
    );
  }
}

export default SessionList;
