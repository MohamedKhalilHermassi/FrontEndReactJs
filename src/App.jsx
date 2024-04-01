import { lazy} from 'react'
import React, { useEffect } from 'react';
//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route,useNavigate } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import Register from './components/register'
import Users from './components/backOffice/users'
import EventList from './components/backOffice/event/eventList.jsx'
import AddEvent from './components/backOffice/event/addEvent.jsx'
import EditEvent from './components/backOffice/event/editEvent.jsx'
import EventsCalendar from './components/backOffice/event/eventsCalendar.jsx'
import EventRegister from './components/eventRegister'
import MyEvents from './components/myevents'


const Events = lazy(()=> import("./components/events"));
const Profil = lazy(()=> import("./components/profil"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {

  return (
    <>
     
    
    
 
      <Routes>
      
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
        <Route path = "Profil" element={<Profil/>}></Route>
        <Route path = "eventRegister" element={<EventRegister/>}></Route>
        <Route path = "myevents" element={<MyEvents/>}></Route>
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
          <Route path="events" element={<EventList/>}/>
          <Route path="addevent" element={<AddEvent/>}/>
          <Route path="edit-event/:id" element={<EditEvent/>} />
          <Route path="eventscalendar" element={<EventsCalendar/>} />
          <Route path = "user" element={<Users/>}></Route>
        </Route>
        <Route path="signin" element={<Login/>}>
         
         </Route>
         <Route path="register" element={<Register/>}>

         </Route>
      </Routes> 
      
      </>
  )
}

export default App
