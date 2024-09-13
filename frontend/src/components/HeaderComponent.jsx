import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PropertySphere</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/properties"
                >
                  Properties
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/tenants"
                >
                  Tenants
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/transactions"
                >
                  Financial
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/maintenance"
                >
                  Maintenance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/campaigns"
                >
                  Marketing & Sales
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/marketing"
                >
                  Forecasting
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
