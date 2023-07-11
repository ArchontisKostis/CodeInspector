import React from "react";

import "./AnalysisInfoSection.css";
import AnalysisSectionHeader from "../../AnalysisSectionHeader/AnalysisSectionHeader.jsx";
import AnalysisInfoBox from "../../../boxes/AnalysisInfoBox/AnalysisInfoBox.jsx";

const AnalysisInfoSection = (props) => {
    const { projectName, totalCommits, fromDate, toDate, repoUrl } = props;

    return (
        <>
            <section className="analysis-info-section">
                <AnalysisSectionHeader
                    title="Analysis Info"
                    icon="bi bi-info-circle-fill" />

                <AnalysisInfoBox
                    projectName={projectName}
                    totalCommits={totalCommits}
                    fromDate={fromDate}
                    toDate={toDate}
                    githubUrl={repoUrl}
                />
            </section>

        </>
    );
}

export default AnalysisInfoSection;