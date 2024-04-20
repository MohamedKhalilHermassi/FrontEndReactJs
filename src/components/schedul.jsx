import React, { useState, useEffect } from 'react';
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

function Schedule() {
  registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cVGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjXX5ccXFVQmBfWURwVg==");

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sessions')
      .then(response => response.json())
      .then(data => {
        setApiData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '2.5em', fontWeight: 'bold', color: '#', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Your Schedule</h1>
        <ScheduleComponent
          currentView='Week'
          height='1080px'
          width='100%'
          startHour='09:00'
          endHour='22:00'
      
          eventSettings={{
            dataSource: apiData.map(event => ({
              Id: event._id,
              Subject: event.course ? event.course.name : 'No Name',
              StartTime: new Date(event.startDate),
              EndTime: new Date(new Date(event.startDate).getTime() + (event.duree || 0) * 60000),
              IsAllDay: false,
              Description: event.course ? event.course.description : 'No Description',
              Location: event.classroom ? `class number: ${event.classroom.number}, ${event.classroom.location.address}, ${event.classroom.location.city}, ${event.classroom.location.state}` : 'No Location',
            }))
          }}
          readonly={true}
        >
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
       
      </div>
    </>
  );
}

export default Schedule;