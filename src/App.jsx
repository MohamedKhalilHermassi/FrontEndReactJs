import { useState } from 'react'
//import './App.css'
import Header from './components/header'
import LandingPage from './components/landingPage'
import Events from './components/events'
import Courses from './components/courses'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    
   <BrowserRouter>
      <Routes>
        <Route path = "" element={<Header/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
      </Routes>
    </BrowserRouter>
    
    
  )
}

export default App
