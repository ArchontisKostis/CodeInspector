import React, { useEffect, useState } from 'react';
import './AnalysisPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";
import HotspotAnalysis from "../../components/HotspotAnalysis/HotspotAnalysis.jsx";
import useFetch from "../../hooks/useFetch.js";
import Wave from "../../ui/Wave/Wave.jsx";
import { useLocation } from "react-router-dom";
import CommitAnalysis from "../../components/CommitAnalysis/CommitAnalysis.jsx";
import LoadingBar from "../../ui/LoadingBar/LoadingBar.jsx";

const defaultOptions = {
    method: 'GET',
};

const AnalysisPage = (props) => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const repoUrl = queryParams.get('repoUrl');
    const fromDate = queryParams.get('fromDate');
    const toDate = queryParams.get('toDate');
    const analysisType = queryParams.get('analysisType');

    const [apiUrl, setApiUrl] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let constructedApiUrl = '';

        if (analysisType === 'hotspot-prioritization') {
            constructedApiUrl = `http://localhost:8000/api/analysis/prioritize_hotspots`;
        } else if (analysisType === 'commit-analysis') {
            constructedApiUrl = `http://localhost:8000/api/analysis/commits`;
        }

        const queryParams = new URLSearchParams();

        if (repoUrl) {
            queryParams.set('repo_url', repoUrl);
        }

        if (fromDate && toDate) {
            queryParams.set('from_date', fromDate);
            queryParams.set('to_date', toDate);
        } else if (fromDate) {
            queryParams.set('from_date', fromDate);
        } else if (toDate) {
            queryParams.set('to_date', toDate);
        }

        const queryString = queryParams.toString();
        if (queryString) {
            constructedApiUrl += `?${queryString}`;
        }

        console.log('constructedApiUrl:', constructedApiUrl);
        setApiUrl(constructedApiUrl);
    }, [repoUrl, fromDate, toDate, analysisType]);

    const { isLoading, error, response } = useFetch(apiUrl);

    const analysis = response?.analysis || {};

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

    useEffect(() => {
        let timer = null;

        if (isLoading) {
            timer = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isLoading]);

    return (
        <>
            <div className="analysis-container">
                <div className="analysis-input-container">
                    {/*<AnalysisForm formType="compact" />*/}

                    <h2 className="analysis-results-header">Analysis Results</h2>
                    <p className="analysis-results-subheader">
                        Your analysis results will be displayed here. You can also download the results as a CSV file.
                    </p>
                    <Wave
                        waveStyle="light"
                    />
                </div>

                {isLoading ? (
                    <div className="progress-bar-container">
                        <h2>Analysing Repository</h2>
                        <p>This might take a while. Grab a coffee and relax!</p>
                        <p>Elapsed Time: {elapsedTime} seconds</p> {/* Display elapsed time */}
                        <LoadingBar />
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <span className="error-msg">
                            <i className="bi bi-exclamation-circle"> <b>Error:</b> {error.message}</i>
                        </span>
                    </div>
                ) : (
                    response && (
                        <>
                            <>
                                {analysisType === 'hotspot-prioritization' ? (
                                    response && <HotspotAnalysis data={response.analysis} />
                                ) : analysisType === 'commit-analysis' ? (
                                    response && <CommitAnalysis data={response.commit_analysis} />
                                ) : null}
                            </>
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
