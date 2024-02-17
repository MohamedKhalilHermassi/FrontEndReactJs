import { useState } from 'react'
//import './App.css'
import Header from './components/header'
import LandingPage from './components/landingPage'
import Events from './components/events'
import Courses from './components/courses'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'


function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path = "" element={<Header/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
        </Route>
      </Routes>    
    
  )
}

export default App
