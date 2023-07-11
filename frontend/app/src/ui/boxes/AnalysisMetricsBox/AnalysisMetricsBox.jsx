import React from "react";

import "./AnalysisMetricsBox.css";

const AnalysisMetricsBox = (props) => {
    const { avgCC, avgChurn, avgNLOC, totalNLOC, totalFiles, totalHotspots } = props;

        return (
            <>
                <div className="analysis-metrics-box-container">
                    <div className="analysis-metrics-box">
                        <div className="metric-item">
                            <h3 className="metric-item-header">Average CC:</h3>
                            <p className="metric-item-value">{avgCC}</p>
                        </div>

                        <div className="metric-item">
                            <h3 className="metric-item-header">Average CHURN:</h3>
                            <p className="metric-item-value">{avgChurn}</p>
                        </div>

                        <div className="metric-item">
                            <h3 className="metric-item-header">Average NLOC:</h3>
                            <p className="metric-item-value">{avgNLOC}</p>
                        </div>

                        <div className="metric-item">
                            <h3 className="metric-item-header">Total NLOC:</h3>
                            <p className="metric-item-value">{totalNLOC}</p>
                        </div>

                        <div className="metric-item">
                            <h3 className="metric-item-header">Total Files:</h3>
                            <p className="metric-item-value">{totalFiles}</p>
                        </div>

                        <div className="metric-item">
                            <h3 className="metric-item-header">Total Hotspots:</h3>
                            <p className="metric-item-value">{totalHotspots}</p>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default AnalysisMetricsBox;