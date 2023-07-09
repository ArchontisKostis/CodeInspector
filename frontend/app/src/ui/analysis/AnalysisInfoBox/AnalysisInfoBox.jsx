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
                    <h3>{projectName}</h3>
                    <p>Total Commits: {totalCommits}</p>
                    <p>From: {formatDate(fromDate)}</p>
                    <p>To: {formatDate(toDate)}</p>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                </div>
            </div>
        </>
    );
}

export default AnalysisInfoBox;
