import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import EventDetails from './eventDetails'; 

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:3000/events')
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }, []);
  
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/events/delete/${id}`)
        .then(() => {
            setEvents(events.filter(event => event._id !== id));
        })
        .catch(error => {
            console.error('Error deleting event:', error);
        });
    }

    const handleView = (event) => {
      setSelectedEvent(event); 
    };

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return selectedEvent ? (
      <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
    ) : (
      <div className="container mt-5">     
        <h1 className="mb-4">Events List</h1>
        <div className="row">
          {currentEvents.map(event => (
            <div key={event._id} className="col-md-4 mb-4">
              <Card className="h-100 shadow">
              <Card.Img variant="top" src={`http://localhost:3000${event.image}`} />
                <Card.Header as="h5">{event.title}</Card.Header>
                <Card.Body className="pb-0">
                  <Card.Text>{event.description}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</ListGroup.Item>
                    <ListGroup.Item><strong>Start Time:</strong> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
                    <ListGroup.Item><strong>End Time:</strong> {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
                    <ListGroup.Item><strong>Location:</strong> {event.location}</ListGroup.Item>
                    <ListGroup.Item><strong>Capacity:</strong> {event.capacity}</ListGroup.Item>
                    <ListGroup.Item><strong>Ticket Price:</strong> {event.ticketPrice} TND</ListGroup.Item>
                    <ListGroup.Item><strong>Category:</strong> {event.category}</ListGroup.Item>
                    <ListGroup.Item><strong>Registered Users:</strong> {event.users.length}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="pt-2">
                  <strong>Status:</strong> 
                  <Badge variant={
                    event.status === 'Incoming' ? 'primary' :
                    event.status === 'Finished' ? 'success' :
                    'danger'
                  }>
                    {event.status}
                  </Badge>
                  <ButtonGroup className="mt-3 d-flex justify-content-end">
                    <Button variant="primary" onClick={() => handleView(event)}>View</Button>
                    <Button variant="secondary" onClick={() => navigate(`/admin/edit-event/${event._id}`)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(event._id)} style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>Delete</Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
        <Pagination>
        {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
};

export default EventList;