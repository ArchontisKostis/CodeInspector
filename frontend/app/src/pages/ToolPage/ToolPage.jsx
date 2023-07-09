import React from "react";

import logo from '../../assets/svg/logo_white.svg';
import './ToolPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";
import ExampleAnalysisBox from "../../ui/ExampleAnalysisBox/ExampleAnalysisBox.jsx";

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
                <h2>Example Analyses</h2>
                <p>
                    Below are some pre-defined analyses for specific repositories and date ranges.
                </p>


                <div className="tool-page-examples">
                    <div className="example-box">
                        <ExampleAnalysisBox />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox />
                    </div>
                </div>
            </div>

            <div className="wave-dark"></div>
        </div>
    );
}

export default ToolPage;