import React from 'react'
import {Link} from 'react-router-dom'

const SideBar = () => {
  return (
    <>
              {/* Menu */}
        <div className="app-brand demo">
          <Link className="app-brand-link justify-content-center" to="/admin">
              <img className="h-75 w-75 mb-2" src="images/Untitled-1.png" alt="" />
          </Link>
          <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}
          <li className="menu-item active">
            <a href="index.html" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle" />
              <div data-i18n="Analytics">Dashboard</div>
            </a>
          </li>
          {/* Layouts */}
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#pages" aria-expanded="false" aria-controls="pages">
              <i className="menu-icon fas fa-spinner fa-flip" />
              <div data-i18n="Layouts">Layouts</div>
            </a>
            <ul id="pages" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li class="sidebar-item">
                  <a href="#" class="sidebar-link menu-link">Analytics</a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link menu-link">Ecommerce</a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link menu-link">Crypto</a>
                </li>
            </ul>
          </li>
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Features</span>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#courses" aria-expanded="false" aria-controls="courses">
              <i className="menu-icon fas fa-book" />
              <div data-i18n="Layouts">Courses</div>
            </a>
            <ul id="courses" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li class="sidebar-item">
                  <Link className="sidebar-link menu-link" to="/admin/addcourse"><i className='menu-icon fas fa-plus'/>Add</Link>
                </li>
                <li class="sidebar-item">
                    <Link class="sidebar-link menu-link" to="/admin/courses"><i class="menu-icon fas fa-grip"></i>List of courses</Link>
                </li>
            </ul>
          </li>
        </ul>
      {/* / Menu */}
    </>
  )
}

export default SideBar