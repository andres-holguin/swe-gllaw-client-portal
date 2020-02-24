import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import logo from '../../images/GonzaloLawLogo.png';

const NavBar = () => {
    return (
        <div className = "header">
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={logo} alt="Gonzalo Law Logo" />
            </Link>
            <div className = "nav-items">
                <Link className = "nav-link" to='/Calendar'>Calendar</Link>
                <Link className = "nav-link" to='/Register'>Extra Page</Link>
            </div>
        </div>
    )
};

export default NavBar;
