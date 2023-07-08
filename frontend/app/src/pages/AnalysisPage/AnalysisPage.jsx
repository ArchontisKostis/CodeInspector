// Analysis page component
// Description: This is the analysis page component. It is the page that the user sees when they visit the website.

import React from 'react';

import './AnalysisPage.css';
import AnalysisForm from "../../components/AnalysisForm/AnalysisForm.jsx";

const AnalysisPage = (props) => {

        return (
            <>
                <div className="analysis-container">
                    <div className="analysis-input-container">

                        <AnalysisForm />

                        <div className="wave-light"></div>
                    </div>

                </div>
            </>
        );
}

export default AnalysisPage;