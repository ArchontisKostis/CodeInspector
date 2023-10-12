// Header Component
// Description: Header component for the application

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo_white.svg';
import {brandName, header} from "../../data/general.json"

import './Header.css';

const Header = () => {
    return (
        <>
            <header className="header">

                <Link to="/" className="header-logo">
                    <img src={logo} alt={brandName + " Logo"}/>
                    <h1>{brandName}</h1>
                </Link>


                <nav className="navbar">
                    <Link to={header.home.url} className="nav-item hover-border">
                        {header.home.title}
                    </Link>

                    <Link to={header.about.url} className="nav-item hover-border">
                        {header.about.title}
                    </Link>

                    <Link to={header.apiDocs.url.dev} className="nav-item hover-border">
                        {header.apiDocs.title}
                    </Link>

                    <Link to={header.tool.url} className="nav-item tool-header-btn">
                        {header.tool.title}
                    </Link>
                </nav>
            </header>
        </>
    );
};

export default Header;