import { useState } from 'react'
//import './App.css'
import Header from './components/header'
import LandingPage from './components/landingPage'
import Events from './components/events'
import Courses from './components/courses'
import { Route } from 'react-router-dom'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    <LandingPage></LandingPage>
    <Events></Events>
    <Courses></Courses>
    <Footer></Footer>
    
    </>
  )
}

export default App
