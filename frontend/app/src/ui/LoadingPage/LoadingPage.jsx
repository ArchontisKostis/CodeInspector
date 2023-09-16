import React from "react";
import logo from "../../assets/svg/logo_white.svg";

import "./LoadingPage.css";

const LoadingPage = () => {

    return (
    <>
        <div className="loading-page">

            <div className='loading-content'>
                <img src={logo} className='loading-page-icon spinner' alt='Loading...'/>
                <h3>Loading application...</h3>
            </div>


            <p className='report-a-problem'>
                Is this taking too long? Report it <a href=''>HERE</a>
            </p>
        </div>
    </>)
};

export default LoadingPage;