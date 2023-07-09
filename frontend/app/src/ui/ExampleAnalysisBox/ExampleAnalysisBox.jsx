import React from "react";

import './ExampleAnalysisBox.css';
const ExampleAnalysisBox = (props) => {
    const { project_name, repo_url, analysis_from_date, analysis_to_date } = props;

    return (
        <div className="example-analysis-box">
            <div className="example-analysis-box-header">
                <i className="bi bi-github"> {project_name}</i>
            </div>

            <div className="example-analysis-box-body">
                <h3>Repo URL: </h3>
                <a href={repo_url}>Click Here</a>
                <h3>Analysis Date: </h3>
                <p>{analysis_from_date} - {analysis_to_date}</p>
            </div>
        </div>
    );
}

export default ExampleAnalysisBox;
