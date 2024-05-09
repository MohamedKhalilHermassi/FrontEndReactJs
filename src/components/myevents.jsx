import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
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
    axios.get(`https://backendexpressjs-2.onrender.com/events/user/${userId}/events`)
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
    axios.post('https://backendexpressjs-2.onrender.com/events/cancel', { eventId, userId })
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
    axios.post('https://backendexpressjs-2.onrender.com/events/rate', { eventId, userId, rating })
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

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  
  return (
    <div className="container mt-7" style={{ height: '600px', overflowY: 'auto' }}>
      <ToastContainer />
      {events.length > 0 ? (
        <div style={cardContainerStyle}>
        {events.map((event, index) => (
         <Card key={event._id} style={{ width: '15rem', marginBottom: '1rem', marginRight: '1rem', fontSize: '0.8rem' }}>
            <Card.Img variant="top" src={`https://backendexpressjs-2.onrender.com${event.image}`} />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>
                {event.description}
                <br />
                Date: {new Date(event.date).toLocaleDateString()}
                <br />
                Start Time: {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                <br />
                End Time: {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                <br />
                Location: {event.location}
                <br />
                Status: {event.status}
              </Card.Text>
              <ReactStars
                count={5}
                value={ratings[event._id] || 0}
                onChange={(newRating) => changeRating(newRating, event._id)}
                size={24}
                activeColor="#ffd700"
              />
              <Button variant="primary" onClick={() => submitRating(event._id)}>Submit Rating</Button>
            <Button 
              onClick={() => cancelParticipation(event._id)} 
              style={{
                backgroundColor: '#ff6347', 
                color: 'white', 
                padding: '10px 24px', 
                border: 'none',
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '16px',
                marginTop: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ff4500'; 
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ff6347'; 
              }}
            >
              Cancel
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<img width="96" height="96" src="https://img.icons8.com/fluency/96/event.png" alt="event"/>      <p>Sorry, you are not registered to attend any event.</p>
    </div>    )}
  </div>
  );
};

export default MyEvents;
