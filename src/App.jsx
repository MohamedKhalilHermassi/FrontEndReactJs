import { lazy } from 'react'
import React, { useEffect } from 'react';

//import './App.css'
import LandingPage from './components/landingPage'
import {  Routes, Route ,useNavigate } from 'react-router-dom'
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
import MyProducts from './components/myproducts'
import SessionAdd from './components/backOffice/Session/SessionAdd'
import SessionList from './components/backOffice/Session/SessionList'
import SessionListS from './components/backOffice/Session/SessionListS'
import SessionEdit from './components/backOffice/Session/SessionEdit'
import ListS from './components/backOffice/Session/ListS'
import Schedul from './components/schedul'
import SessionDrag from './components/backOffice/Session/SessionDrag'
import Reclamtions from './components/Reclamtions'
import Editadmin from './components/backOffice/editadmin'
import Recla from './components/backOffice/reclamationadmin'
import AuthService from './service/AuthService';
const Events = lazy(()=> import("./components/events"));
const Profil = lazy(()=> import("./components/profil"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const navigate = useNavigate();
  const excludedRoutes = ["/signin", "/register","/events","/courses","/market"];
  const adminRoutes = ["/admin", "/admin/products","/admin/user","/admin/editadmin","/admin/listS","/admin/reclamaation"];
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!excludedRoutes.includes(window.location.pathname) && AuthService.isTokenExpired(token)) {
      AuthService.logout(); 
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (adminRoutes.includes(window.location.pathname) && !AuthService.hasPermission(token,"admin")) {
      navigate('/');
    }
  }, [navigate]);

  

  return (

    <>
     
<div><Toaster position="top-right"/></div>


<div>
    <Routes>
      <Route path="" element={<LandingPage />}>
        <Route path="" element={<Acceuil />} />
        <Route path="events" element={<Events />} />
        <Route path="courses" element={<Courses />} />
        <Route path="market" element={<AddProductForm />} />
        <Route path="marketplace" element={<ProductList />} />
        <Route path="Profil" element={<Profil />} />
        <Route path = "myproducts" element={<MyProducts/>}></Route>
        <Route path = "schedule" element={<Schedul/>}></Route>
        <Route path='add-session' element={<SessionAdd/>}></Route>
        <Route path = "reclamation" element={<Reclamtions/>}></Route>
      </Route>

      {/* Section d'administration */}
    
        <Route path="admin" element={<Dashboard />}>
          <Route path="" element={<AdminLandingPage />} />
          
          <Route path="user" element={<Users />} />
          <Route path="editadmin" element={<Editadmin />} />
          <Route path="addsession" element={<SessionAdd/>} />
          <Route path="reclamaation" element={<Recla/>} />
        <Route path="listsession" element={<SessionList/>} />
        <Route path="listsession2" element={<SessionListS/>} />
        <Route path="editSession/:id" element={<SessionEdit/>} />
        <Route path="ListS" element={<ListS/>} />
        <Route path="ListDrag" element={<SessionDrag/>} />
            <Route path="courses" element={<CourseList/>} />
            <Route path="addcourse" element={<CourseAdd/>} />
          <Route path='Archivedproducts' element={<ArchivedProductList/>}/>
          <Route path='ordersList' element={<OrdersList/>}/>
          <Route path='products' element={<ProductListBack></ProductListBack>}/>
        </Route>
    

      {/* Routes signin et register */}
      <Route path="signin" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
    </div>
      </>
  );

}

export default App


