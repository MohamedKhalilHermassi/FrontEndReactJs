import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './myCalendar.css';

const localizer = momentLocalizer(moment);

const MyEvent = ({ event }) => (
  <div className="custom-event" style={{ backgroundColor: event.color }}>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
  </div>
);

const MyToolbar = (toolbar) => {
  const [view, setView] = useState('month');

  const handleViewChange = (newView) => {
    setView(newView);
    toolbar.onView(newView);
  };

  return (
    <div className="custom-toolbar">
      <button onClick={() => toolbar.onNavigate('PREV')}>Prev</button>
      <button disabled>{toolbar.label}</button>
      <button onClick={() => toolbar.onNavigate('NEXT')}>Next</button>
      <select onChange={(e) => handleViewChange(e.target.value)}>
        <option value={Views.MONTH}>Month</option>
        <option value={Views.WEEK}>Week</option>
        <option value={Views.DAY}>Day</option>
      </select>
    </div>
  );
};

const MyCalendar = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredEvents(events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, 500); // delay of 500ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, events]);

  return (
    <div className="custom-calendar">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search events" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />
     <Calendar
  localizer={localizer}
  events={filteredEvents}
  startAccessor="start"
  endAccessor="end"
  components={{
    event: MyEvent,
    toolbar: MyToolbar,
  }}
  eventPropGetter={(event, start, end, isSelected) => {
    let newStyle = {
      color: "red",
    };

    return {
      className: "",
      style: newStyle,
      tooltip: event.title
    };
  }}
/>
    </div>
  );
};

export default MyCalendar;