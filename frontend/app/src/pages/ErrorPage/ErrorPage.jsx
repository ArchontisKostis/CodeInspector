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
            <a className="freepik-img-error" href="https://www.freepik.com/free-vector/error-404-concept-illustration_7741849.htm#query=error%20404&position=21&from_view=search&track=ais">Image by storyset on Freepik</a>
            <p className="error-404-msg">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="error-btn">Go Home</Link>

        </div>
        <Wave
            waveStyle="light" />
        </>
    );
}

export default ErrorPage;