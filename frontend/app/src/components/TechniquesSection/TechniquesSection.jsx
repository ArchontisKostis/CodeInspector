import React from "react";

import './TechniquesSection.css';
import TechniqueBox from "../../ui/home/TechniqueBox/TechniqueBox.jsx";
import Wave from "../../ui/Wave/Wave.jsx";

const TechniquesSection = () => {
    return (
        <div className="techniques-section">
            <Wave
                waveStyle="dark"
            />

            <h2>Sophisticated Analysis Techniques</h2>
            <article className="techniques-section-desc">
                At CodeInspector, we employ sophisticated analysis techniques to deliver
                comprehensive insights into your codebase. Our app leverages the Delta Maintainability
                Model (DMM) and the Eisenhower Matrix to help you make informed decisions and drive impactful
                improvements.
            </article>

            <TechniqueBox
                title="Delta Maintainability Model"
                description={
                    "Our tool utilizes the Delta Maintainability Model (DMM) to evaluate " +
                    "the maintainability implications of code changes. By categorizing commits " +
                    "based on DMM complexity, we provide insights into the quality of each change, " +
                    "empowering you to make informed decisions during code reviews and further enhancements."
                }
            />

            <TechniqueBox
                title="Eisenhower Matrix"
                description={
                    "Our hotspot prioritization technique draws inspiration from the renowned " +
                    "Eisenhower Matrix. By considering complexity and code churn, we identify critical " +
                    "areas that require immediate attention, helping you streamline your efforts and focus " +
                    "on areas that will yield the greatest impact."
                }
            />

            <div className="triangle-seperator"></div>
        </div>
    );
}

export default TechniquesSection;