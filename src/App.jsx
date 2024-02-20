import { useState, lazy, Suspense } from 'react'
//import './App.css'
import LandingPage from './components/landingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'

const Events = lazy(()=> import("./components/events"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const [count, setCount] = useState(0)

  return (
    
      <Routes>
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
      
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
        </Route>
        <Route path="signin" element={<Login/>}>
         
         </Route>
       
      </Routes>    
    
  )
}

export default App
