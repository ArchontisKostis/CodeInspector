import React from 'react';
import './AnalysisPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";
import HotspotAnalysis from "../../components/HotspotAnalysis/HotspotAnalysis.jsx";
import useFetch from "../../hooks/useFetch.js";
import Wave from "../../ui/Wave/Wave.jsx";

const defaultOptions = {
    method: 'GET',
};

const AnalysisPage = (props) => {
    const { isLoading, error, response } = useFetch(
        'http://localhost:8000/api/analysis/prioritize_hotspots?repo_url=https://github.com/GeorgeApos/pyassess',
        defaultOptions
    );


    const { analysis } = response || {};
    const {
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
    } = analysis || {};

    // Calculate progress percentage
    const progress = response ? 100 : isLoading ? 0 : -1;


    return (
        <>
            <div className="analysis-container">
                <div className="analysis-input-container">
                    <AnalysisForm formType="compact" />

                    <Wave
                        waveStyle="light"
                    />
                </div>

                {isLoading ? (
                    <div className="progress-bar-container">
                        <h2>Analysing Repository</h2>
                        <p>This might take a while. Grab a coffee and relax!</p>

                        <progress className="progress-bar" />
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <span className="error-msg">
                            <i className="bi bi-exclamation-circle"> Error: {error.message}</i>
                        </span>
                    </div>
                ) : (
                    response && (
                        <>
                            <HotspotAnalysis data={analysis} />

                            <button className="export-to-csv-btn">
                                <i className="bi bi-filetype-csv"></i>
                                <p>Export to CSV</p>
                            </button>
                        </>
                    )
                )}

                <Wave
                    waveStyle="dark"
                />
            </div>
        </>
    );
};

export default AnalysisPage;
