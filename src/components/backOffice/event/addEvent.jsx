import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner, Card} from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    capacity: '',
    ticketPrice: '',
    category: 'Concert',
    status: 'Incoming',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [showToast, setShowToast] = useState(false);

  const handleChange = e => {
    if (e.target.name === 'image') {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
  
      axios.post('http://localhost:3000/upload', formData)
        .then(res => {
          setFormData(prevState => ({
            ...prevState,
            image: res.data.imageUrl
          }));
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setIsSubmitting(true);

      let eventDate = new Date(formData.date);
      let [startHours, startMinutes] = formData.startTime.split(':');
      let [endHours, endMinutes] = formData.endTime.split(':');
  
      let startTime = new Date(eventDate.setHours(startHours, startMinutes));
      let endTime = new Date(eventDate.setHours(endHours, endMinutes));
  
      
      let newFormData = {
        ...formData,
        startTime,
        endTime
      };

      axios.post('http://localhost:3000/events/add', newFormData)
        .then(response => {
          console.log('Event created:', response.data);
          toast.success('Event created successfully!'); 
        })
        .catch(error => {
          console.error('Error creating event:', error);
          toast.error('Error creating event.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.date) {
      errors.date = 'Date is required';
      isValid = false;
    } else {
      const eventDate = new Date(formData.date);
      const currentDate = new Date();
      if (eventDate <= currentDate) {
        errors.date = 'Date must be in the future';
        isValid = false;
      }
    }

    if (!formData.startTime) {
      errors.startTime = 'Start time is required';
      isValid = false;
    }
    
    if (!formData.endTime) {
      errors.endTime = 'End time is required';
      isValid = false;
    }
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      errors.startTime = 'Start time must be earlier than end time';
      errors.endTime = 'End time must be later than start time';
      isValid = false;
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    if (formData.capacity <= 0) {
      errors.capacity = 'Capacity must be a positive number';
      isValid = false;
    }

    if (formData.ticketPrice <= 0) {
      errors.ticketPrice = 'Ticket price must be a positive number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <Container>
      <ToastContainer />
      <Card>
      <Card.Header style={{ 
        background: 'linear-gradient(to right, #ff9966, #ff5e62)', 
        color: 'white', 
        textAlign: 'center', 
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', 
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1.5em',
        padding: '20px'
        }}>
  <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '10px' }}>event</i>
  Create Event
      </Card.Header>
      <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" style={{ marginTop: '20px' }}>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} isInvalid={!!errors.title} />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} isInvalid={!!errors.description} />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} isInvalid={!!errors.date} />
          <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} isInvalid={!!errors.startTime} />
          <Form.Control.Feedback type="invalid">{errors.startTime}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Time:</Form.Label>
        <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} isInvalid={!!errors.endTime}  />
        <Form.Control.Feedback type="invalid">{errors.endTime}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location:</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} isInvalid={!!errors.location}  />
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Capacity:</Form.Label>
          <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} isInvalid={!!errors.capacity} />
          <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ticket Price:</Form.Label>
          <Form.Control type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} isInvalid={!!errors.ticketPrice} />
          <Form.Control.Feedback type="invalid">{errors.ticketPrice}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Category:</Form.Label>
        <Form.Select name="category" value={formData.category} onChange={handleChange}>
            <option value="Concert">concert</option>
            <option value="Charity">charity</option>
            <option value="Audition">audition</option>
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Status:</Form.Label>
        <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="Incoming">incoming</option>
            <option value="Finished">finished</option>
            <option value="Canceled">canceled</option>
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Create Event'}
        </Button>
      </Form>
      </Card.Body>
        </Card>
    </Container>
  );
};
export default AddEvent;













