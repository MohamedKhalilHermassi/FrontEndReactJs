import { lazy } from 'react'
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
import Register from './components/register'
import Users from './components/backOffice/users'
import ArchivedProductList from './components/backOffice/archivedProducts'
import OrdersList from './components/backOffice/orders'
import CourseAdd from './components/backOffice/course/courseAdd'
import CourseList from './components/backOffice/course/courseList'
import { Toaster } from 'react-hot-toast'

const Events = lazy(()=> import("./components/events"));
const Profil = lazy(()=> import("./components/profil"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {

  return (
    <>
      <div><Toaster position="top-right"/></div>
      <Routes>
      
        <Route path = "" element={<LandingPage/>}>
        <Route path = "" element={<Acceuil/>}></Route>
        <Route path = "events" element={<Events/>}></Route>
        <Route path = "courses" element={<Courses/>}></Route>
        <Route path = "market" element={<AddProductForm/>}></Route>
        <Route path = "marketplace" element={<ProductList/>}></Route>
        <Route path = "Profil" element={<Profil/>}></Route>
        </Route>
        <Route path="admin" element={<Dashboard/>}>
          <Route path='' element={<AdminLandingPage/>}/>
            <Route path="courses" element={<CourseList/>} />
            <Route path="addcourse" element={<CourseAdd/>} />
          <Route path='Archivedproducts' element={<ArchivedProductList/>}/>
          <Route path='ordersList' element={<OrdersList/>}/>
          <Route path='products' element={<ProductListBack></ProductListBack>}/>
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
