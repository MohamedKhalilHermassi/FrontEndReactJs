import {Link} from 'react-router-dom'
import kindyLogo from '../../assets/img/logo.png'
const SideBar = () => {
  return (
    <>
      {/* Menu */}
      <div className="app-brand demo">
        <Link className="app-brand-link justify-content-center" to="/admin">
          <img className="h-75 w-75 mb-2" src={kindyLogo} alt="" />
        </Link>
        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </a>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        {/* Dashboard */}
        <li className="menu-item active">
          <a  className="menu-link"><Link to="/admin">
            <i className="menu-icon tf-icons bx bx-home-circle" />
            <div data-i18n="Analytics">Dashboard</div></Link>
          </a>
        </li>
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Features</span>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#courses" aria-expanded="false" aria-controls="courses">
            <i className="menu-icon fas fa-book" />
            <div data-i18n="Layouts">Courses</div>
          </a>
          <ul id="courses" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <Link className="sidebar-link menu-link" to="/admin/addcourse"><i className="menu-icon fas fa-plus" />Add</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/courses"><i className="menu-icon fas fa-grip" />List of courses</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#classrooms" aria-expanded="false" aria-controls="classrooms">
          <i class="menu-icon fa-solid fa-chalkboard-user"></i>
            <div data-i18n="Layouts">Classrooms</div>
          </a>
          <ul id="classrooms" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <Link className="sidebar-link menu-link" to="/admin/addlocation"><i className="menu-icon fas fa-plus" />Add Location</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/locations"><i className="menu-icon fas fa-grip" />List of locations</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#products" aria-expanded="false" aria-controls="products">
            <i className="menu-icon fa-solid fa-store" />
            <div data-i18n="Layouts">Products</div>
          </a>
          <ul id="products" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <Link className="sidebar-link menu-link" to="/admin/addBook"><i className="menu-icon fas fa-plus" />Add</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/products"><i className="menu-icon fas fa-grip" />List of products</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/Archivedproducts"><i className="menu-icon fas fa-circle-xmark" />Archived products</Link>
            </li>

          </ul>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#orders" aria-expanded="false" aria-controls="orders">
            <i className="menu-icon fa-solid fa-cart-shopping" />
            <div data-i18n="Layouts">Orders</div>
          </a>
          <ul id="orders" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <Link className="sidebar-link menu-link" to="/admin/ordersList"><i className="menu-icon fas fa-plus" />List of orders</Link>
            </li>



          </ul>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#sessions" aria-expanded="false" aria-controls="orders">
            <i className="menu-icon fa-solid fa-cart-shopping" />
            <div data-i18n="Layouts">Sessions</div>
          </a>
          <ul id="sessions" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
            <Link className="sidebar-link menu-link" to="/admin/addsession"><i className="menu-icon fas fa-plus" />Create Session</Link>

            </li>
            <li className="sidebar-item">
            <Link className="sidebar-link menu-link" to="/admin/listsession"><i className="menu-icon fas fa-plus" />Sessions</Link>

            </li>
            <li className="sidebar-item">
            <Link className="sidebar-link menu-link" to="/admin/listsession2"><i className="menu-icon fas fa-plus" />Sessions</Link>

            </li>
            <li className="sidebar-item">
            <Link className="sidebar-link menu-link" to="/admin/listS"><i className="menu-icon fas fa-plus" />ListS</Link>

            </li>
            <li className="sidebar-item">
            <Link className="sidebar-link menu-link" to="/admin/ListDrag"><i className="menu-icon fas fa-plus" />ListDrag</Link>

            </li>


          </ul>
        </li>
        
        <li className="menu-item">
            <Link className="sidebar-link menu-link" to="/admin/reclamaation">
            <i className="menu-icon bx bxs-message-square-error" />
            <div data-i18n="Layouts">Reclamtions</div>
            </Link>
        </li>
        <li className="menu-item">
          <a href="#" className="menu-link menu-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#events" aria-expanded="false" aria-controls="events">
            <i className="menu-icon fa-solid fa-calendar-days" />
            <div data-i18n="Layouts">Events</div>
          </a>
          <ul id="events" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <Link className="sidebar-link menu-link" to="/admin/addevent"><i className="menu-icon fas fa-plus" />Add Event</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/events"><i className="menu-icon fas fa-grip" />List of events</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/eventscalendar"><i className="menu-icon fas fa-grip" />Events Calendar</Link>
            </li>
            <li className="sidebar-item">
              <Link class="sidebar-link menu-link" to="/admin/registeredusers"><i className="menu-icon fas fa-grip" />Registered Users</Link>
            </li>
          </ul>
        </li>
      </ul>
      {/* / Menu */}
    </>
  );
};

export default SideBar




