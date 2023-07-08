import React from "react";



const AnalysisFileBox = (props) => {
    const { fileName, cc, churn, nloc } = props;

    return (
        <>
            <div className="analysis-info-box-container">
                <div className="analysis-info-box">
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

