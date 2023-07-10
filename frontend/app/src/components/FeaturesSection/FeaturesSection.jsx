import React from "react";

import "./FeaturesSection.css";
import FeatureBox from "../../ui/home/FeatureBox/FeatureBox.jsx";
import Wave from "../../ui/Wave/Wave.jsx";

const FeaturesSection = (props) => {
    return (
        <>
        <div className="features-section-container">
            <Wave waveStyle="light" />

            <h2 className="features-section-title">Features</h2>

            <FeatureBox
                title="Hotspot Prioritization"
                icon="bi bi-graph-up"
                description={
                    "Identify critical areas in your codebase that require attention. " +
                    "Prioritize files based on complexity and code churn. Focus on improving software quality and maintainability."
                }
            />

            <FeatureBox
                title="Commit Analysis with DMM"
                icon="bi bi-git"
                description={
                    "Assess the impact of individual commits on maintainability. " +
                    "Using the Delta Maintainability Model, gain insights on the quality of each commit."
                }
            />

            <FeatureBox
                title="Customizable Date Range"
                icon="bi bi-calendar2-week"
                description={
                    "Deepen your understanding with our tool to thoroughly examine the " +
                    "contents and activities of your repositories, by focusing on a specific date range."
                }
            />



        </div>
        </>
    );
}

export default FeaturesSection;