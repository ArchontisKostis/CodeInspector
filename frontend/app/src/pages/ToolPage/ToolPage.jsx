import React from "react";

import logo from '../../assets/svg/logo_white.svg';
import './ToolPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";

const ToolPage = () => {
    return (
        <div className="tool-page-container">
            <div className="tool-page-form-container">
                <img src={logo} />
                <h1>CodeInspector</h1>

                <AnalysisForm />

                <div className="wave"></div>
            </div>

            <div className="tool-page-examples-container">
            </div>
        </div>
    );
}

export default ToolPage;