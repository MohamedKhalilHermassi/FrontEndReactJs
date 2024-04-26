import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [ratings, setRatings] = useState({});
  const userId = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`https://backendexpressjsback.onrender.com/events/user/${userId}/events`)
      .then(response => {
        setEvents(response.data);
       // Create an object with the user's ratings for each event
       const initialRatings = {};
       response.data.forEach(event => {
         const userRating = event.ratings.find(rating => rating.user === userId);
         initialRatings[event._id] = userRating ? userRating.rating : 0;
       });
       setRatings(initialRatings);
     })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const headerStyle = {
    backgroundColor: '#90caf9', 
    color: '#000',
  };

  const rowStyle = {
    backgroundColor: '#e3f2fd', 
  };

  const cancelParticipation = (eventId) => {
    const event = events.find(event => event._id === eventId);

    if (event.status === 'Finished' || event.status === 'Cancelled') {
      toast.error('You cannot cancel participation in a finished or cancelled event');
      return;
    }
    axios.post('https://backendexpressjsback.onrender.com/events/cancel', { eventId, userId })
      .then(response => {
        setEvents(events.filter(event => event._id !== eventId));
        toast.success('Successfully cancelled participation in the event');
      })
      .catch(error => {
        console.error('Error cancelling participation:', error);
        toast.error('Error cancelling participation');
      });
  };

  const changeRating = (newRating, name) => {
    setRatings({ ...ratings, [name]: newRating });
  };

  const submitRating = (eventId) => {
    const event = events.find(event => event._id === eventId);
  
  if (event.status !== 'Finished') {
    toast.error('You can only rate a finished event');
    return;
  }
    const rating = ratings[eventId];
    axios.post('https://backendexpressjsback.onrender.com/events/rate', { eventId, userId, rating })
      .then(response => {
        console.log('Rating submitted:', response.data);
        toast.success('Rating submitted successfully');
      // Update the user's rating in the state
      setRatings({ ...ratings, [eventId]: rating });
    })
      .catch(error => {
        console.error('Error submitting rating:', error);
        toast.error('Error submitting rating');
      });
  };
  return (
    <div className="container mt-7">
      <ToastContainer />
      {events.length > 0 ? (
        <Table striped bordered hover>
          <thead style={headerStyle}>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} style={index % 2 === 0 ? rowStyle : null}>
                <td><img src={`http://localhost:3000${event.image}`} alt={event.title} style={{ width: '100px' }} /></td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{event.location}</td>
                <td>{event.status}</td>
                <td>
                <ReactStars
                    count={5}
                    value={ratings[event._id] || 0}
                    onChange={(newRating) => changeRating(newRating, event._id)}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <Button variant="primary" onClick={() => submitRating(event._id)}>Submit Rating</Button>
                </td>
                <td>
                <button 
                onClick={() => cancelParticipation(event._id)} 
                style={{
                  backgroundColor: '#ff6347', 
                  color: 'white', 
                  padding: '10px 24px', 
                  border: 'none',
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  fontSize: '16px' 
                  }}
                  onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#ff4500'; 
                  }}
                  onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ff6347'; 
                  }}
                >
                Cancel
              </button>
              </td>
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