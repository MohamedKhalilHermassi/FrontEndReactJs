import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`http://localhost:3000/events/user/${userId}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const headerStyle = {
    backgroundColor: '#90caf9', // Very light blue color
    color: '#000',
  };

  const rowStyle = {
    backgroundColor: '#e3f2fd', // Extremely light blue color
  };

  return (
    <div className="container mt-7">
      {events.length > 0 ? (
        <Table striped bordered hover>
          <thead style={headerStyle}>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} style={index % 2 === 0 ? rowStyle : null}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{event.location}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>You have no events.</p>
      )}
    </div>
  );
};

export default MyEvents;