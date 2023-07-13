import React from 'react';

import './AnalysisInfoBox.css';

const AnalysisInfoBox = (props) => {
    const { projectName, totalCommits, fromDate, toDate, githubUrl } = props;

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
                    {totalCommits === null ? <p><b>Total Commits:</b> Not Calculated</p> : <p><b>Total Commits:</b> {totalCommits}</p>}
                    <p><b>From:</b> {formatDate(fromDate)}</p>
                    <p><b>To:</b> {formatDate(toDate)}</p>

                    <a href={githubUrl} >
                        <i className="bi bi-globe2"> </i>
                        GitHub Repository
                    </a>
                </div>
            </div>
        </>
    );
}

export default AnalysisInfoBox;
