import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import EventDetails from './backOffice/event/eventDetails'; 
import Form from 'react-bootstrap/Form';
import ReactSelect from 'react-select';
import EventsGallery from './eventsGallery';

const categories = [
  { value: 'All', label: 'All' },
  { value: 'Concert', label: 'Concert' },
  { value: 'Charity', label: 'Charity' },
  { value: 'Audition', label: 'Audition' },
];

function Events({userId}) {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    //const [registerError, setRegisterError] = useState(null);
    //const [ticketCount, setTicketCount] = useState(1);
    //const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const handleCategoryChange = (selectedOption) => {
      setSelectedCategory(selectedOption.value);
    };

    const fetchEvents = () => {
        setLoading(true);
        setError(null);
        axios.get('http://localhost:3000/events')
          .then(response => {
            let filteredEvents = response.data;
            if (selectedCategory !== 'All') {
              filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
            }
            setEvents(filteredEvents);
            setLoading(false);
          })
            .catch(error => {
                console.error('Error fetching events:', error);
                setError('Error fetching events.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, [selectedCategory]);

  

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const viewDetails = (eventId) => {
      const event = events.find(e => e._id === eventId);
      setCurrentEvent(event);
      setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error} <Button onClick={fetchEvents}>Try Again</Button>
            </Alert>
        );
    }

    return (
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
          {currentEvent && <EventDetails event={currentEvent} onBack={handleClose} showButtons={false} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={() => navigate('/eventRegister', { state: { eventId: currentEvent._id } })}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
        
        <div className="container mt-7">
          <h1 className="mb-6">Event List</h1>
          <EventsGallery />
          <Form.Group controlId="categorySelect" style={{ marginBottom: '20px' }}>
          <Form.Label>Category</Form.Label>
          <ReactSelect 
            options={categories} 
            value={categories.find(category => category.value === selectedCategory)} 
            onChange={handleCategoryChange} 
          />
        </Form.Group>
          <div className="row">
            {currentEvents.map(event => (
              <div key={event._id} className="col-md-12 mb-4">
                <Card className="h-100 shadow flex-md-row">
                  <Card.Img variant="left" src={`http://localhost:3000${event.image}`} style={{ width: '30%', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Header as="h5">{event.title}</Card.Header>
                    <Card.Text>{event.description}</Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</ListGroup.Item>
                      <ListGroup.Item><strong>Start Time:</strong> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
                      <ListGroup.Item><strong>End Time:</strong> {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
                      <ListGroup.Item><strong>Location:</strong> {event.location}</ListGroup.Item>
                      <ListGroup.Item><strong>Capacity:</strong> {event.capacity}</ListGroup.Item>
                      <ListGroup.Item><strong>Ticket Price:</strong> {event.ticketPrice}</ListGroup.Item>
                      <div className="mt-2">
                        <strong>Status:</strong>
                        <Badge variant={
                          event.status === 'Incoming' ? 'primary' :
                          event.status === 'Finished' ? 'success' :
                          'danger'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    </ListGroup>
                    <Card.Footer className="mt-auto pt-2 d-flex justify-content-between align-items-center">
                      <Button variant="primary" onClick={() => viewDetails(event._id)}>View Details</Button>
                    </Card.Footer>
                  </Card.Body>
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
      </>
    );
};

export default Events;