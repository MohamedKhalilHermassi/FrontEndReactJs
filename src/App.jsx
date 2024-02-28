import { useState, lazy, Suspense } from 'react'
//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import CourseAdd from './components/backOffice/course/courseAdd'
import { NavBar } from './components/navbar'
import CourseList from './components/backOffice/course/courseList'

const Events = lazy(()=> import("./components/events"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
      <Route path="" element={<LandingPage/>}>
        <Route path="" element={<Acceuil/>} />
        <Route path="events" element={<Events/>} />
        <Route path="courses" element={<Courses/>} />
      </Route>
      <Route path="admin" element={<Dashboard/>}>
        <Route path='' element={<AdminLandingPage/>} />
        <Route path="courses" element={<CourseList/>} />
        <Route path="addcourse" element={<CourseAdd/>} />
      </Route>
      <Route path="signin" element={<Login/>} />
    </Routes>
      </>
  )
}

export default App
