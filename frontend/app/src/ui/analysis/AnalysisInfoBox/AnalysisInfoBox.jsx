import React from 'react';

import './AnalysisInfoBox.css';

const AnalysisInfoBox = (props) => {
    const { projectName, totalCommits, fromDate, toDate, githubUrl } = props;

    return (
        <>
            <div className="analysis-info-box-container">
                <div className="analysis-info-box">
                    <h3>{projectName}</h3>
                    <p>Total Commits: {totalCommits}</p>
                    <p>From: {fromDate}</p>
                    <p>To: {toDate}</p>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                </div>
            </div>
        </>
    );
}

export default AnalysisInfoBox;
