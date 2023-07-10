import React from "react";

import logo from '../../assets/svg/logo_white.svg';
import './ToolPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";
import ExampleAnalysisBox from "../../ui/ExampleAnalysisBox/ExampleAnalysisBox.jsx";
import Wave from "../../ui/Wave/Wave.jsx";

const ToolPage = () => {

    return (
        <div className="tool-page-container">
            <div className="tool-page-form-container">
                <img src={logo} className="logo"/>
                <h1>CodeInspector</h1>

                <AnalysisForm />

                <Wave waveStyle="light" />
            </div>

            <div className="tool-page-examples-container">
                <h2>Example Analyses</h2>
                <p>
                    Below are some pre-defined analyses for specific repositories and date ranges.
                </p>


                <div className="tool-page-examples">
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="PyAssess"
                            repo_url="https://github.com/GeorgeApos/pyassess"
                            analysis_from_date="2010-10-10"
                            analysis_to_date="2023-10-10"
                            analysis_type="hotspot-prioritization"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="PhysioAssistant Android"
                            repo_url="https://github.com/Android-Development-UoM/PhysioAssistant-FrontEnd"
                            analysis_from_date="2010-10-10"
                            analysis_to_date="2023-10-10"
                            analysis_type="hotspot-prioritization"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="PyAssess"
                            repo_url="https://github.com/GeorgeApos/pyassess"
                            analysis_from_date="2010-10-10"
                            analysis_to_date="2023-10-10"
                            analysis_type="hotspot-prioritization"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="PyAssess"
                            repo_url="https://github.com/GeorgeApos/pyassess"
                            analysis_from_date="2010-10-10"
                            analysis_to_date="2023-10-10"
                            analysis_type="hotspot-prioritization"
                        />
                    </div>
                </div>

                <Wave waveStyle="dark" />

            </div>


        </div>
    );
}

export default ToolPage;