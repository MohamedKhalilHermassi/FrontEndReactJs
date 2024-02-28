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
      <SideBar></SideBar>
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