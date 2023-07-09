import React from "react";

import "./AnalysisFileBox.css";

const AnalysisFileBox = (props) => {
    const { fileName, cc, churn, nloc } = props;

    return (
        <>
            <div className="analysis-file-box-container">
                <div className="analysis-file-box">
                    <h3>{fileName}</h3>
                    <p><b>CC:</b> {cc}</p>
                    <p><b>CHURN:</b> {churn}</p>
                    <p><b>NLOC:</b> {nloc}</p>
                </div>
            </div>
        </>
    );
}

export default AnalysisFileBox;

