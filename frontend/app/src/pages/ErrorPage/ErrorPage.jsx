import React from "react";

import "./ErrorPage.css";
import errorImg from "../../assets/svg/404_error.svg";
import Wave from "../../ui/Wave/Wave.jsx";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
        <div className="error-page">
            <img src={errorImg} alt="404 Error. Page Not Found." className="error-svg"/>
            <p className="error-404-msg">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="error-btn">Go Home</Link>

        </div>
        <Wave
            waveStyle="light" />
        </>
    );
}

export default ErrorPage;