import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
          <div className = "nav-items">
            <Link className = "nav-link" to='/Calendar'>Calendar</Link>
            <Link className = "nav-link" to='/Register'>Extra Page</Link>
          </div>
        </div>
    )
};

export default NavBar;
