import React from "react";

import "./FeaturesSection.css";
import FeatureBox from "../../ui/home/FeatureBox/FeatureBox.jsx";
import Wave from "../../ui/Wave/Wave.jsx";

import data from "../../data/pages/home.json";

const FeaturesSection = (props) => {
    return (
        <>
        <div className="features-section-container">
            <Wave waveStyle="light" />

            <h2 className="features-section-title">Features</h2>

            {
                data.featuresSection.features
                    .map((feature, index) => {
                        return (
                            <FeatureBox
                                key={index}
                                title={feature.title}
                                icon={feature.icon}
                                description={feature.description}
                            />
                        );
                    })
            }
        </div>
        </>
    );
}

export default FeaturesSection;