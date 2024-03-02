import {lazy } from 'react'
//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route } from 'react-router-dom'
import Dashboard from './components/backOffice/Dashboard'
import AdminLandingPage from './components/backOffice/adminLandingPage'
import Acceuil from './components/acceuil'
import Login from './components/login'
import AddProductForm from './components/sell'
import ProductList from './components/market'
import ProductListBack from './components/backOffice/products'

const Events = lazy(()=> import("./components/events"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {

  return (
    <>
      
      <Routes>
      
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
        <Route path = "market" element={<AddProductForm/>}></Route>
        <Route path = "marketplace" element={<ProductList/>}></Route>
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
          <Route path='products' element={<ProductListBack></ProductListBack>}/>
        </Route>
        <Route path="signin" element={<Login/>}>
         
         </Route>
       
      </Routes>    
      </>
  )
}

export default App
