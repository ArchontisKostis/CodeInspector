import React from "react";

import './ExampleAnalysisBox.css';
import {useNavigate} from "react-router-dom";
const ExampleAnalysisBox = (props) => {
    const { project_name, repo_url, analysis_from_date, analysis_to_date, analysis_type } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        let params = { repoUrl: repo_url, fromDate: analysis_from_date, toDate: analysis_to_date, analysisType: analysis_type };

        const queryParams = new URLSearchParams(params);
        const queryString = queryParams.toString();

        navigate(`/analysis?${queryString}`);
    }

    return (
        <div className="example-analysis-box" onClick={handleClick}>
            <div className="example-analysis-box-header">
                <i className="bi bi-github"> {project_name}</i>
            </div>

            <div className="example-analysis-box-body">
                <h3>Repo URL: </h3>
                <a href={repo_url}>Click Here</a>
                <h3>Analysis Date: </h3>
                <p>{analysis_from_date} - {analysis_to_date}</p>

                <h3>Analysis Type: </h3>
                <p>{analysis_type}</p>
            </div>
        </div>
    );
}

export default ExampleAnalysisBox;
