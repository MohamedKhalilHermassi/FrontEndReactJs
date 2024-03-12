import { useState, lazy, Suspense } from 'react'
//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import { NavBar } from './components/navbar'
import SessionAdd from './components/backOffice/Session/SessionAdd'
import SessionList from './components/backOffice/Session/SessionList'
import SessionListS from './components/backOffice/Session/SessionListS'
import SessionEdit from './components/backOffice/Session/SessionEdit'
import ListS from './components/backOffice/Session/ListS'
import Schedul from './components/schedul'
import SessionDrag from './components/backOffice/Session/SessionDrag'
import { Toaster } from 'react-hot-toast'

const Events = lazy(()=> import("./components/events"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
           <div>
           <Toaster position="top-right" />
           

      <Routes>
      
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
        <Route path = "schedule" element={<Schedul/>}></Route>
      
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
          <Route path="addsession" element={<SessionAdd/>} />
        <Route path="listsession" element={<SessionList/>} />
        <Route path="listsession2" element={<SessionListS/>} />
        <Route path="editSession/:id" element={<SessionEdit/>} />
        <Route path="ListS" element={<ListS/>} />
        <Route path="ListDrag" element={<SessionDrag/>} />
        </Route>
        <Route path="signin" element={<Login/>}>
         
         </Route>
       
      </Routes>    
      </div>
      </>
  )
}

export default App
