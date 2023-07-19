// Header Component
// Description: Header component for the application

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo_white.svg';

import './Header.css';

const Header = () => {
    return (
        <>
            <header className="header">

                <Link to="/" className="header-logo">
                    <img src={logo} alt="CodeInspector Logo"/>
                    <h1>CodeInspector</h1>
                </Link>


                <nav className="navbar">
                    <Link to="/" className="nav-item hover-border">Home</Link>
                    <Link to="/about" className="nav-item hover-border">How It Works</Link>
                    <Link to="http://localhost:8000/redoc" className="nav-item hover-border">API</Link>
                    <Link to="/tool" className="nav-item hover-border">The Tool</Link>
                </nav>
            </header>
        </>
    );
};

export default Header;