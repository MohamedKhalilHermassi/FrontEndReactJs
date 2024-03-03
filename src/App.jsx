import { useState, lazy, Suspense } from 'react'
//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import { NavBar } from './components/navbar'
import EventList from './components/backOffice/event/eventList.jsx'
import AddEvent from './components/backOffice/event/addEvent.jsx'
import EditEvent from './components/backOffice/event/editEvent.jsx'
import EventsCalendar from './components/backOffice/event/eventsCalendar.jsx'
import { BrowserRouter } from 'react-router-dom';
const Events = lazy(()=> import("./components/events"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
      
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
      
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
          <Route path="events" element={<EventList/>}/>
          <Route path="addevent" element={<AddEvent/>}/>
          <Route path="edit-event/:id" element={<EditEvent/>} />
          <Route path="eventscalendar" element={<EventsCalendar/>} />
        </Route>
        <Route path="signin" element={<Login/>}/>
      </Routes>    
      </>
  )
}

export default App
