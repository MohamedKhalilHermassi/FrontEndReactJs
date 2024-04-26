import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCalendar from './myCalendar';

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('https://backendexpressjsback.onrender.com/events')
      .then(response => {
        const transformedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: event.title
        }));
        setEvents(transformedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Calendar</h1>
      <MyCalendar events={events} />
    </div>
  );
};

export default EventsCalendar;