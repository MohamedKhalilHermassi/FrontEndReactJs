import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const geocode = async (location) => {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=29300e597d374561b958572e7d9e342e`);
    const data = await response.json();
    
    const coordinates = [data.results[0].geometry.lat, data.results[0].geometry.lng];
    return coordinates;
  } catch (error) {
    console.error('Error geocoding:', error);
    return null;
  }
};

const EventDetails = ({ event, onBack, showButtons = true }) => {
  const [countdown, setCountdown] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    
    geocode(event.location).then(coords => {
      setCoordinates(coords);
    });

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(event.startTime).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  const handleShare = () => {
    navigator.share({
      title: event.title,
      text: event.description,
      url: window.location.href,
    });
  };

  return (
    <Card className="mt-5">
      <Card.Header as="h2">{event.title}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={`http://localhost:3000${event.image}`} />
        <Card.Text className="mt-3">{event.description}</Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item><strong>Start Time:</strong> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
          <ListGroup.Item><strong>End Time:</strong> {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ListGroup.Item>
          <ListGroup.Item><strong>Location:</strong> {event.location}</ListGroup.Item>
          <ListGroup.Item><strong>Capacity:</strong> {event.capacity}</ListGroup.Item>
          <ListGroup.Item><strong>Ticket Price:</strong> {event.ticketPrice}</ListGroup.Item>
          <ListGroup.Item><strong>Countdown:</strong> {countdown}</ListGroup.Item>
        </ListGroup>
        {coordinates && (
          <MapContainer center={coordinates} zoom={13} style={{ height: "180px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates}>
              <Popup>
                {event.location}
              </Popup>
            </Marker>
          </MapContainer>
        )}
        {showButtons && (
          <>
            <Button className="mt-3" variant="primary" onClick={onBack}>Back to list</Button>
            <Button className="mt-3 ml-3" variant="secondary" onClick={handleShare}>Share</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventDetails;