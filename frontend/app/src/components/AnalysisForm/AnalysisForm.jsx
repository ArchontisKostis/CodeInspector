// AnalysisForm component
// This component is used to display the form for the user to enter the data for the analysis

import React, {useState} from 'react';

import './AnalysisForm.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";

const AnalysisForm = (props) => {
    const { formType } = props;

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        repoUrl: '',
        fromDate: '',
        toDate: '',
        analysisType: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams(formData);
        const queryString = queryParams.toString();

        navigate(`/analysis?${queryString}`);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="analysis-form-container">
                <h2>Analyze Repository</h2>

                <form onSubmit={handleSubmit} className={formType}>
                    <div className="analysis-form-group">
                        <label>Repo URL:</label>
                        <input
                            type="url"
                            className="repo-url-input"
                            placeholder="https://github.com/Android-Development-UoM/PhysioAssistant-FrontEnd"
                            name="repoUrl"
                            value={formData.repoUrl}
                            onChange={handleChange}
                            required={true}
                            pattern="^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$"
                            title="Enter a valid GitHub repository URL. (e.g. https://github.com/ArchontisKostis/CodeInspector)"
                        />
                    </div>

                    <div className="analysis-form-group">
                        <label>From Date:</label>
                        <input
                            type="date"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="analysis-form-group">
                        <label>To Date:</label>
                        <input
                            type="date"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="analysis-form-radio-group">
                        <div className="radio-group">
                            <input
                                type="radio" id="hotspot-prioritization"
                                name="analysisType"
                                value="hotspot-prioritization"
                                checked={formData.analysisType === "hotspot-prioritization"}
                                onChange={handleChange}
                                required={true}
                            />

                            <label htmlFor="hotspot-prioritization">Prioritize Hotspots</label>
                        </div>

                        <div className="radio-group">
                            <input
                                type="radio"
                                id="commit-analysis"
                                name="analysisType"
                                value="commit-analysis"
                                checked={formData.analysisType === "commit-analysis"}
                                onChange={handleChange}
                                required={true}
                            />

                            <label htmlFor="commit-analysis">Analyze Commits</label>
                        </div>
                    </div>

                    <div className="analysis-form-group">
                        <button type="submit" className="analysis-form-submit-btn">
                            <i className="bi bi-search"></i>
                            Inspect
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AnalysisForm;