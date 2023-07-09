import React from "react";

import './ExampleAnalysisBox.css';
const ExampleAnalysisBox = () => {
    return (
        <div className="example-analysis-box">
            <div className="example-analysis-box-header">
                <i className="bi bi-github"> Project Name</i>
            </div>

            <div className="example-analysis-box-body">
                <h3>Repo URL: </h3>
                <a href="#">Click Here</a>
                <h3>Analysis Date: </h3>
                <p>2021/04/20 - 2023/04/20</p>
            </div>
        </div>
    );
}

export default ExampleAnalysisBox;
