import React, { useState, useEffect } from 'react';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
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
    <br />
    <br />
    
    <div className="App">
      <ScheduleComponent currentView='Week' 
                         eventSettings={{ dataSource: apiData.map(event => ({
                            Id: event._id,
                            Subject: event.course ? event.course.name : 'No Name', // Check if course exists
                            StartTime: new Date(event.startDate),
                            EndTime: new Date(new Date(event.startDate).getTime() + (event.duree || 0) * 60000), // Calculate end time based on start time and duration
                            IsAllDay: false,
                            Description: event.course ? event.course.description : 'No Description', // Check if course exists
                            Location: event.classroom ? "class number :"+ `${event.classroom.number}, ${event.classroom.location.address}, ${event.classroom.location.city}, ${event.classroom.location.state}` : 'No Location' // Check if classroom exists
                          })) }}
                         readonly={true} // Set readonly to true to disable editing and deleting functionalities
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
    <style>{`
      /* Hide the edit and delete icons */
      .e-schedule .e-event-popup .e-edit-button,
      .e-schedule .e-event-popup .e-delete-button {
        display: none;
      }
    `}</style>
    </>
    
  );
}

export default Schedule;
