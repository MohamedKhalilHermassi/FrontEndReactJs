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
import Editadmin from './components/backOffice/editadmin'
import AuthService from './service/AuthService';
const Events = lazy(()=> import("./components/events"));
const Profil = lazy(()=> import("./components/profil"));
const Courses = lazy(()=> import ("./components/courses"));
function App() {
  const navigate = useNavigate();
  const excludedRoutes = ["/signin", "/register","/events","/courses","/market"];
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!excludedRoutes.includes(window.location.pathname) && AuthService.isTokenExpired(token)) {
      AuthService.logout(); 
      navigate('/');
    }
  }, [navigate]);

  const hasPermission = (requiredRole) => {
    const token = localStorage.getItem('userToken');
    return AuthService.hasPermission(token, requiredRole);
  };

  return (
    <Routes>
      <Route path="" element={<LandingPage />}>
        <Route path="" element={<Acceuil />} />
        <Route path="events" element={<Events />} />
        <Route path="courses" element={<Courses />} />
        <Route path="market" element={<AddProductForm />} />
        <Route path="marketplace" element={<ProductList />} />
        <Route path="Profil" element={<Profil />} />
      </Route>

      {/* Section d'administration */}
      {hasPermission('admin') ? (
        <Route path="admin" element={<Dashboard />}>
          <Route path="" element={<AdminLandingPage />} />
          <Route path="products" element={<ProductListBack />} />
          <Route path="user" element={<Users />} />
          <Route path="editadmin" element={<Editadmin />} />
        </Route>
      ) : null}

      {/* Routes signin et register */}
      <Route path="signin" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App


