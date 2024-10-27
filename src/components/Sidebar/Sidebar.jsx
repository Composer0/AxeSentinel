import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ onLogout }) => {
    const location = useLocation();

    return (
        <nav className="sidebar">
            <ul>
                <li className={location.pathname === '/scanner' ? 'active' : ''}>
                    <Link to="/scanner">Scanner</Link>
                </li>
                <li className={location.pathname === '/saved-reports' ? 'active' : ''}>
                    <Link to="/saved-reports">Saved Reports</Link>
                </li>
                <li>
                    <Link onClick={onLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;