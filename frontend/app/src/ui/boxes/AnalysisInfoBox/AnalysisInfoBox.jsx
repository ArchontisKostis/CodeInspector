import React from 'react';

import './AnalysisInfoBox.css';
import {Link} from "react-router-dom";

const AnalysisInfoBox = (props) => {
    const { projectName, fromDate, toDate, githubUrl } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <>
            <div className="analysis-info-box-container">
                <div className="analysis-info-box">
                    <h3>
                        <i className="bi bi-github"> </i>
                        {projectName}
                    </h3>
                    <p><b>From:</b> {formatDate(fromDate)}</p>
                    <p><b>To:</b> {formatDate(toDate)}</p>

                    <Link to={githubUrl} >
                        <i className="bi bi-globe2"> </i>
                        GitHub Repository
                    </Link>
                </div>
            </div>
        </>
    );
}

export default AnalysisInfoBox;
