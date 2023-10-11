import React from "react";

import './TechniquesSection.css';
import TechniqueBox from "../../ui/home/TechniqueBox/TechniqueBox.jsx";
import Wave from "../../ui/Wave/Wave.jsx";

import data from "../../data/pages/home.json";

const TechniquesSection = () => {
    return (
        <div className="techniques-section">
            <Wave
                waveStyle="dark"
            />

            <h2>{data.techniquesSection.header}</h2>
            <article className="techniques-section-desc">
                {data.techniquesSection.article}
            </article>

            {
                data.techniquesSection.techniques.map((technique, index) => {
                    return (
                        <TechniqueBox
                            key={index}
                            title={technique.title}
                            description={technique.description}
                        />
                    );
                })
            }

            <div className="triangle-seperator"></div>
        </div>
    );
}

export default TechniquesSection;