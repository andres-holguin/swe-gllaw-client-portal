import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ProgressBar from '../ProgressBar/ProgressBar'
import logo from '../../images/GonzaloLawLogo.png';

const NavBar = () => {
    const [progressPercent, setProgressPercent] = useState(10)

    return (
        <div>
            <div className = "header">
                <Link className = "nav-title" to="/">
                    <img className = "nav-logo" src={logo} alt="Gonzalo Law Logo" />
                </Link>
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Calendar'>Calendar</Link>
                    <Link className = "nav-link" to='/Documents'>Documents</Link>
                    <Link className = "nav-link" to='/Selector'>Switch Project</Link>
                </div>
            </div>
            <div className='progressBar'>
                <ProgressBar percent={progressPercent}/>
                <button onClick={() => setProgressPercent(prev => prev + 10)}>update progress</button>
            </div>
        </div>
    )
};

export default NavBar;
