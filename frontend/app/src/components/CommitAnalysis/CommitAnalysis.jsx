import React from 'react';

import './CommitAnalysis.css';
import PaginatedTable from "../../ui/PaginatedTable/PaginatedTable.jsx";
import AnalysisInfoSection from "../../ui/analysis/sections/AnalysisInfoSection/AnalysisInfoSection.jsx";
import AnalysisSectionHeader from "../../ui/analysis/AnalysisSectionHeader/AnalysisSectionHeader.jsx";

const CommitAnalysis = (props) => {
    const { data } = props;

    const {
        project_name,
        repo_url,
        from_date,
        to_date,
        commits,
        total_commits
    } = data;

    const commitsColumns = [
        { key: 'hash', label: 'Hash' },
        { key: 'author', label: 'Author' },
        { key: 'committer', label: 'Committer' },
        { key: 'committer_date', label: 'Committer Date' },
        { key: 'number_of_deleted_lines', label: 'Deleted Lines' },
        { key: 'number_of_added_lines', label: 'Added Lines' },
        { key: 'number_of_files_changed', label: 'Files Changed' },
        { key: 'dmm_unit_size', label: 'DMM Size' },
        { key: 'dmm_unit_complexity', label: 'DMM Complexity' },
        { key: 'dmm_unit_interfacing', label: 'DMM Interfacing' },
        { key: 'change_category', label: 'Change Rating' },
    ];

    return (
        <>
            <div className="commit-analysis-container">
                <h1 className="commit-analysis-header">Commit Analysis</h1>

                <AnalysisInfoSection
                    projectName={project_name}
                    totalCommits={total_commits}
                    fromDate={from_date}
                    toDate={to_date}
                    repoUrl={repo_url}
                />

                <div className="commit-table">
                    <AnalysisSectionHeader
                        title="Commits"
                        icon="bi bi-git" />

                    <PaginatedTable
                        data={commits}
                        itemsPerPage={50}
                        columns={commitsColumns}
                    />
                </div>

            </div>
        </>
    );
}

export default CommitAnalysis;