import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import userService from '../service/userService';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFDocument = ({ ticketId, eventTitle, ticketPrice }) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.title}>E-Ticket</Text>
            <Text><Text style={styles.bold}>Ticket ID:</Text> {ticketId}</Text>
            <Text><Text style={styles.bold}>Event:</Text> {eventTitle}</Text>
            <Text><Text style={styles.bold}>Ticket Price:</Text> {ticketPrice}</Text>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#f9f9f9',
        color: '#333',
        fontFamily: 'Helvetica',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
});


function EventRegister() {
    const location = useLocation();
    const eventId = location.state.eventId;
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventId: eventId, tickets: 1 });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(null); 
    const [ticketId, setTicketId] = useState(null);
    const [eventTitle, setEventTitle] = useState('');

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
        event.preventDefault();
        const userId = localStorage.getItem('id');
        const data = { ...formData, userId: userId };
        try {
            const response = await axios.post('http://localhost:3000/events/register', data);
            if (response.status === 200) {
                setSuccess('Successfully registered for the event!');
                setError(null);
                const ticketId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                setTicketId(ticketId);
            } else {
                setError('Failed to register for the event.');
                setSuccess(null);
            }
        } catch (error) {
            setError('Failed to register for the event.');
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-7">
            <h1>Register for Event</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
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
            {ticketId && (
            <div>
            <div style={{
                border: '1px solid black',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '600px',
                margin: 'auto',
                marginTop: '20px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                color: '#333',
                fontFamily: 'Helvetica',
                }}>
            <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>E-Ticket</h2>
        <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Ticket ID:</strong> {ticketId}</p>
        <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Event:</strong> {eventTitle}</p>
        <p style={{ fontSize: '1.2em', margin: '10px 0' }}><strong>Ticket Price:</strong> {ticketPrice}</p>
        <QRCode value={ticketId} size={128} />
        </div>
        <PDFDownloadLink document={<PDFDocument ticketId={ticketId} eventTitle={eventTitle} ticketPrice={ticketPrice} />} fileName="ticket.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download E-Ticket')}
                </PDFDownloadLink>
                </div>
            )}
        </div>
    );
}

export default EventRegister;