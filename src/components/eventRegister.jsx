import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import userService from '../service/userService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EventRegister() {
    const location = useLocation();
    const eventId = location.state.eventId;
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventId: eventId, tickets: 1 });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(null); 
    const [eventTitle, setEventTitle] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the authenticated user's data from localStorage
        const email = localStorage.getItem('email');
        if (email) {
            userService.getUser(email).then(user => {
                setFormData(prevFormData => ({ ...prevFormData, name: user.fullname, email: user.email, phone: user.phone }));
            });
        }
        
        axios.get(`http://localhost:3000/events/${eventId}`).then(response => {
            setEventTitle(response.data.title);    
            setTicketPrice(response.data.ticketPrice);
        });
    }, [eventId]);

    const handleTicketChange = (e) => {
        setFormData({ ...formData, tickets: e.target.value });
    };

    const handleSubmit = async (event) => {

        if (event.ticketPrice===0)
            {
                event.preventDefault();

                const userId = localStorage.getItem('id');
                const data = { ...formData, userId: userId };
                try {
                    const response = await axios.post('http://localhost:3000/events/register', data);
                    if (response.status === 200) {
                        setSuccess('Successfully registered for the event!');
                        setError(null);
                        setTimeout(() => {
                            navigate('/events');
                        }, 2000);
                    } else {
                        setError('Failed to register for the event.');
                        setSuccess(null);
                    }
                } catch (error) {
                    setError('Failed to register for the event.');
                    setSuccess(null);
                }
            }
            else if (event.ticketPrice!=0)
                {
                    const total = event.ticketPrice*1000;
                    await axios.post('http://localhost:3000/payement/flouciproduct',{amount:total})
                    .then((result)=>{
                      console.log(result.data)
                      window.location.replace(result.data.result.link); 
                      
                    }).catch((err)=>console.log(err));
                }
       
    };

    return (
        <div className="container mt-7">
            <h1>Register for Event</h1>
            {error && 
            <Alert variant="danger" onClose={() => setError(null)} dismissible transition style={{backgroundColor: '#ff4d4d', color: '#ffffff'}}>
                {error}
            </Alert>
        }
        {success && 
            <Alert variant="success" onClose={() => setSuccess(null)} dismissible transition style={{backgroundColor: '#33cc33', color: '#ffffff'}}>
                {success}
            </Alert>
        }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} readOnly />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} readOnly />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} readOnly />
                </Form.Group>
                <Form.Group controlId="tickets">
                    <Form.Label>Tickets</Form.Label>
                    <Form.Control type="number" name="tickets" value={formData.tickets} onChange={handleTicketChange} min="1" />
                </Form.Group>
                <p>Total Price: {formData.tickets * ticketPrice}</p>
                <Button variant="primary" type="submit">Register</Button>
                
            </Form>
            <br />
        </div>
    );
}

export default EventRegister;