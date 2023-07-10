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
                            analysis_from_date="01/01/2021"
                            analysis_to_date="01/02/2021"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="CodeInspector"
                            repo_url="#"
                            analysis_from_date="01/01/2021"
                            analysis_to_date="01/02/2021"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="CodeInspector"
                            repo_url="#"
                            analysis_from_date="01/01/2021"
                            analysis_to_date="01/02/2021"
                        />
                    </div>
                    <div className="example-box">
                        <ExampleAnalysisBox
                            project_name="CodeInspector"
                            repo_url="#"
                            analysis_from_date="01/01/2021"
                            analysis_to_date="01/02/2021"
                        />
                    </div>
                </div>

                <Wave waveStyle="dark" />

            </div>


        </div>
    );
}

export default ToolPage;