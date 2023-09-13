// HotspotAnalysis Component
// Description: Component for the Hotspot analysis page

import React from 'react';

import './HotspotAnalysis.css';
import AnalysisSectionHeader from "../../ui/analysis/AnalysisSectionHeader/AnalysisSectionHeader.jsx";
import AnalysisMetricsBox from "../../ui/boxes/AnalysisMetricsBox/AnalysisMetricsBox.jsx";
import ScatterPlot from "../../ui/charts/ScatterPlot/ScatterPlot.jsx";
import AnalysisFileBox from "../../ui/boxes/AnalysisFileBox/AnalysisFileBox.jsx";
import PaginatedTable from "../../ui/PaginatedTable/PaginatedTable.jsx";
import AnalysisInfoSection from "../../ui/analysis/sections/AnalysisInfoSection/AnalysisInfoSection.jsx";

const HotspotAnalysis = (props) => {
    const { data } = props;

    const {
        project_name,
        repo_url,
        from_date,
        to_date,
        max_complexity_file,
        max_churn_file,
        avg_complexity,
        avg_churn,
        avg_nloc,
        total_nloc,
        total_files,
        total_outliers,
        total_prioritized_files,
        prioritized_files,
        outliers,
    } = data;

    const filesColumns = [
        { key: 'name', label: 'Filename' },
        { key: 'metrics.CC', label: 'CC', nested: true },
        { key: 'metrics.NLOC', label: 'NLOC', nested: true },
        { key: 'metrics.CHURN', label: 'CHURN', nested: true },
        { key: 'priority', label: 'Priority' },
    ];

    const searchColumns = ['name', 'priority'];


    return (
        <>
            <div className="hotspot-analysis">
                <h1 className="hotspot-analysis-header">Hotspot Analysis</h1>

                <div className="analysis-boxes-container">
                    <AnalysisInfoSection
                        projectName={project_name}
                        totalCommits={null}
                        fromDate={from_date}
                        toDate={to_date}
                        githubUrl={repo_url}
                    />

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="General Metrics"
                            icon="bi bi-speedometer" />

                        <AnalysisMetricsBox
                            avgCC={avg_complexity.toFixed(2)}
                            avgChurn={avg_churn.toFixed(2)}
                            avgNLOC={avg_nloc.toFixed(2)}
                            totalNLOC={total_nloc}
                            totalFiles={total_files}
                            totalHotspots={total_prioritized_files}
                        />
                    </section>

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="Max Complexity File"
                            icon="bi bi-file-earmark-code" />

                        <AnalysisFileBox
                            fileName={max_complexity_file.name}
                            cc={max_complexity_file.metrics.CC}
                            churn={max_complexity_file.metrics.CHURN}
                            nloc={max_complexity_file.metrics.NLOC}
                        />
                    </section>

                    <section className="analysis-section-item">
                        <AnalysisSectionHeader
                            title="Max Churn File"
                            icon="bi bi-file-earmark-code" />

                        <AnalysisFileBox
                            fileName={max_churn_file.name}
                            cc={max_churn_file.metrics.CC}
                            churn={max_churn_file.metrics.CHURN}
                            nloc={max_churn_file.metrics.NLOC}
                        />
                    </section>

                </div>

                <AnalysisSectionHeader
                    title="Hotspot Prioritization Matrix"
                    icon="bi bi-graph-up" />

                <ScatterPlot data={prioritized_files} />

                <AnalysisSectionHeader
                    title="Modified Files"
                    icon="bi bi-file-earmark-binary" />

                <PaginatedTable
                    data={[...outliers, ...prioritized_files]}
                    searchColumns={searchColumns}
                    itemsPerPage={50}
                    columns={filesColumns}
                    searchColumn={'name'}
                    exportFilename={'hotspot_analysis_' + project_name + '_modified_files_CodeInspector.csv'}
                />

            </div>
        </>
    );
}

export default HotspotAnalysis;