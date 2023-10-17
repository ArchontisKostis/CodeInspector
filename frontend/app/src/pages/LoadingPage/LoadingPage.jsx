import React from "react";
import logo from "../../assets/svg/logo_white.svg";

import "./LoadingPage.css";
import data from "../../data/pages/loading.json"

const LoadingPage = () => {

    return (
    <>
        <div className="loading-page">

            <div className='loading-content'>
                <img
                    src={logo}
                    className='loading-page-icon spinner'
                    alt={data.headerText}
                />
                <h3>{data.headerText}</h3>
            </div>


            <p className='report-a-problem'>
                {data.subText}
                <a href={data.reportIt.url}>
                    {data.reportIt.text}
                </a>
            </p>
        </div>
    </>)
};

export default LoadingPage;