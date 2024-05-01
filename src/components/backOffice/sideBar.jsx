import { Link } from 'react-router-dom';
import kindyLogo from '../../assets/img/logo.png';

const SideBar = () => {
  return (
    <div className="sidebar">
      {/* Brand Logo */}
      <div className="sidebar-brand">
        <Link to="/admin">
          <img src={kindyLogo} alt="Kindy Logo" className="brand-logo" />
          <span className="brand-text">Kindy</span>
        </Link>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {/* Dashboard */}
        <li className="menu-item">
          <Link to="/admin" className="menu-link">
            <i className="bx bx-home-circle menu-icon" />
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>

        {/* Features */}
        <li className="menu-item">
          <span className="menu-header">Features</span>
          <ul className="submenu">
            {/* Courses */}
            <li className="submenu-item">
              <Link to="/admin/courses" className="submenu-link">
                <i className="fas fa-book submenu-icon" />
                <span className="submenu-text">Courses</span>
              </Link>
            </li>

            {/* Classrooms */}
            <li className="submenu-item">
              <Link to="/admin/locations" className="submenu-link">
                <i className="fas fa-chalkboard-user submenu-icon" />
                <span className="submenu-text">Classrooms</span>
              </Link>
            </li>

            {/* Products */}
            <li className="submenu-item">
              <Link to="/admin/products" className="submenu-link">
                <i className="fas fa-store submenu-icon" />
                <span className="submenu-text">Products</span>
              </Link>
            </li>

            {/* Orders */}
            <li className="submenu-item">
              <Link to="/admin/ordersList" className="submenu-link">
                <i className="fas fa-cart-shopping submenu-icon" />
                <span className="submenu-text">Orders</span>
              </Link>
            </li>

            {/* Sessions */}
            <li className="submenu-item">
              <Link to="/admin/listS" className="submenu-link">
                <i className="fas fa-school submenu-icon" />
                <span className="submenu-text">Sessions</span>
              </Link>
            </li>

            {/* Transactions */}
            <li className="submenu-item">
              <Link to="/admin/trasnsactionList" className="submenu-link">
                <i className="fas fa-credit-card submenu-icon" />
                <span className="submenu-text">Transactions</span>
              </Link>
            </li>

            {/* Reclamations */}
            <li className="submenu-item">
              <Link to="/admin/reclamaation" className="submenu-link">
                <i className="bx bxs-message-square-error submenu-icon" />
                <span className="submenu-text">Reclamations</span>
              </Link>
            </li>

            {/* Events */}
            <li className="submenu-item">
              <Link to="/admin/events" className="submenu-link">
                <i className="fas fa-calendar-days submenu-icon" />
                <span className="submenu-text">Events</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
