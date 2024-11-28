import React from 'react';
import { FaHome, FaUser, FaDonate, FaClipboardList, FaShoppingCart, FaCog, FaClipboard, FaChartBar, FaCalendarAlt, FaArchive } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './AdminSideBar.css';

const AdminSideBar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-section">
        <h3>Main</h3>
        <ul>
          <li><NavLink to="/admin/home"><FaHome /> Home</NavLink></li>
          <li><NavLink to="/admin/profile"><FaUser /> Profile</NavLink></li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>Management</h3>
        <ul>
          <li><NavLink to="/admin/donors"><FaDonate /> Donors</NavLink></li>
          <li><NavLink to="/admin/prospects"><FaClipboardList /> Prospects</NavLink></li>
          <li><NavLink to="/admin/orders"><FaShoppingCart /> Orders</NavLink></li>
        </ul>
      </div>
      
      {/* <div className="sidebar-section">
        <h3>Settings</h3>
        <ul>
          <li><NavLink to="/admin/elements"><FaClipboard /> Elements</NavLink></li>
          <li><NavLink to="/admin/settings"><FaCog /> Settings</NavLink></li>
          <li><NavLink to="/admin/backups"><FaArchive /> Backups</NavLink></li>
        </ul>
      </div> */}
      
      <div className="sidebar-section">
        <h3>Others</h3>
        <ul>
          <li><NavLink to="/admin/charts"><FaChartBar /> Charts</NavLink></li>
          <li><NavLink to="/admin/logs"><FaClipboardList /> All Logs</NavLink></li>
          <li><NavLink to="/admin/calendar"><FaCalendarAlt /> Calendar</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
