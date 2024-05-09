import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import { ScheduleComponent, Day, Week, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

const EventsCalendar = () => {
  registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cVGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjXX5ccXFVQmBfWURwVg==");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then(response => {
        const transformedEvents = response.data.map(event => ({
          ...event,
          StartTime: new Date(event.startTime),
          EndTime: new Date(event.endTime),
          Subject: event.title,
          Location: event.location
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
      <ScheduleComponent eventSettings={{ dataSource: events }}>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default EventsCalendar;