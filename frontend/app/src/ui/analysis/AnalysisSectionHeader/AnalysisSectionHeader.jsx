import React from "react";

import "./AnalysisSectionHeader.css";

const AnalysisSectionHeader = (props) => {
    const { title, icon} = props;

    return (
        <>
            <div className="analysis-section-header">
                <i className={icon}></i>
                <h3>{title}</h3>
            </div>
        </>
    );
}

export default AnalysisSectionHeader;