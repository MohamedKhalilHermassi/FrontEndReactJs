import React from 'react'
import SideBar from './sideBar'
import NavBar from './navBar'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <>
    <div>
  {/* Layout wrapper */}
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <SideBar></SideBar>
    </aside>
      {/* Layout container */}
      <div className="layout-page">
        <NavBar></NavBar>
        <Outlet/>
      </div>
      {/* / Layout page */}
    </div>
    {/* Overlay */}
    <div className="layout-overlay layout-menu-toggle" />
  </div>
  {/* / Layout wrapper */}
</div>
</>
  )
}

export default Dashboard