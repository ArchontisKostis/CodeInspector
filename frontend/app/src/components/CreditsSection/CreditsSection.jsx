import React from "react";

import './CreditsSection.css';
import Wave from "../../ui/Wave/Wave.jsx";

import data from "../../data/pages/home.json";

const CreditsSection = () => {
    return (
        <div className="credits-section">
            <h2>{data.creditsSection.header}</h2>

            {
                data.creditsSection.articles.map((article, index) => {
                    return (
                        <article key={index} className="credits-section-article">
                            {article}
                        </article>
                    );
                })
            }

            <h3 className="made-with-header">Made With:</h3>

            <div className="made-with-container">
                {
                    data.creditsSection.madeWithTechImages.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image.src}
                                className="made-with-logo"
                                alt={image.alt}
                            />
                        );
                    })
                }
            </div>

            <Wave
                waveStyle="dark red-bg"
            />
        </div>
    );
}

export default CreditsSection;