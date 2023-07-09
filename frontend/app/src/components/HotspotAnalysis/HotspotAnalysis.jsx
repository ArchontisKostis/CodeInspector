// HotspotAnalysis Component
// Description: Component for the Hotspot analysis page

import React from 'react';

import './HotspotAnalysis.css';
import AnalysisSectionHeader from "../../ui/analysis/AnalysisSectionHeader/AnalysisSectionHeader.jsx";
import AnalysisInfoBox from "../../ui/analysis/AnalysisInfoBox/AnalysisInfoBox.jsx";
import AnalysisMetricsBox from "../../ui/analysis/AnalysisMetricsBox/AnalysisMetricsBox.jsx";
import ScatterPlot from "../../ui/charts/ScatterPlot/ScatterPlot.jsx";
import AnalysisFileBox from "../../ui/analysis/AnalysisFileBox/AnalysisFileBox.jsx";
import FilesTable from "../../ui/tables/FilesTable/FilesTable.jsx";

const HotspotAnalysis = (props) => {
    const { data } = props;

    return (
        <>
            <div className="hotspot-analysis">
                <h1>Hotspot Analysis</h1>

                <div className="analysis-boxes-container">
                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="Analysis Info"
                            icon="bi bi-info-circle-fill" />

                        <AnalysisInfoBox
                            projectName={"Project Name"}
                            totalCommits={"Total Commits"}
                            fromDate={"From Date"}
                            toDate={"To Date"}
                            githubUrl={"GitHub URL"}
                        />
                    </section>

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="General Metrics"
                            icon="bi bi-speedometer" />

                        <AnalysisMetricsBox
                            avgCC={10}
                            avgChurn={2.34}
                            avgNLOC={2.34}
                            totalNLOC={2.34}
                            totalFiles={2.34}
                            totalHotspots={2.34}
                        />
                    </section>

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="Max Complexity File"
                            icon="bi bi-file-earmark-code" />

                        <AnalysisFileBox
                            fileName={"filename.java"}
                            cc={10}
                            churn={7}
                            nloc={34}
                        />
                    </section>

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="Max Churn File"
                            icon="bi bi-file-earmark-code" />

                        <AnalysisFileBox
                            fileName={"filename.java"}
                            cc={4}
                            churn={32}
                            nloc={34}
                        />
                    </section>

                </div>

                <AnalysisSectionHeader
                    title="Hotspot Prioritization Matrix"
                    icon="bi bi-graph-up" />

                <ScatterPlot data={data} />

                <AnalysisSectionHeader
                    title="Modified Files"
                    icon="bi bi-file-earmark-binary" />

                <FilesTable files={data} />

            </div>
        </>
    );
}

export default HotspotAnalysis;