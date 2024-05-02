import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const EditEvent = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      capacity: 0,
      ticketPrice: 0,
      category: '',
      status: '',
      image: null,
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/events/${id}`)
            .then(response => {
                if (response.data) {
                    response.data.date = new Date(response.data.date).toISOString().slice(0, 10);
                    response.data.startTime = new Date(response.data.startTime).toISOString().slice(11, 16);
                    response.data.endTime = new Date(response.data.endTime).toISOString().slice(11, 16);
                    setFormData(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setErrors({ fetch: 'Error fetching event data. Please try again.' });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const handleImageChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0]
        });
      };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'title':
                error = value.trim() ? '' : 'Title is required';
                break;
            case 'description':
                error = value.trim() ? '' : 'Description is required';
                break;
            case 'date':
                error = value ? '' : 'Date is required';
                if (value) {
                    const eventDate = new Date(value);
                    const currentDate = new Date();
                    if (eventDate <= currentDate) {
                        error = 'Date must be in the future';
                    }
                }
                break;
            case 'startTime':
                error = value ? '' : 'Start time is required';
                break;
            case 'endTime':
                error = value ? '' : 'End time is required';
                if (value && formData.startTime && new Date(`1970-01-01T${value}:00`) <= new Date(`1970-01-01T${formData.startTime}:00`)) {
                error = 'End time must be after start time';
                }
                break;
            case 'location':
                error = value.trim() ? '' : 'Location is required';
                break;
            case 'capacity':
                error = value > 0 ? '' : 'Capacity must be a positive number';
                break;
            case 'ticketPrice':
                error = value > 0 ? '' : 'Ticket price must be a positive number';
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = e => {
        e.preventDefault();
    
        
        Object.keys(formData).forEach(name => validateField(name, formData[name]));
    
        const isValid = Object.values(errors).every(error => !error);
    
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

        const imageData = new FormData();
        imageData.append('image', formData.image);

        axios.post('http://localhost:3000/upload', imageData)
            .then(response => {
                const data = { ...newFormData, image: response.data.imageUrl };

                return axios.put(`http://localhost:3000/events/edit/${id}`, data);
            })
            .then(response => {
                console.log('Event updated:', response.data);
                toast.success('Event updated successfully!');
                setShowAlert(true);
            })
            .catch(error => {
                console.error('Error updating event:', error);
                toast.error('Error updating event.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }
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
                    Update Event
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
                            <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} isInvalid={!!errors.endTime} />
                            <Form.Control.Feedback type="invalid">{errors.endTime}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} isInvalid={!!errors.location} />
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
                            <Form.Control type="file" name="image" onChange={handleImageChange}/>
                        </Form.Group>    
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Update Event'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
     
    );
};

export default EditEvent;