import React from "react";

import "./About.css";
import Wave from "../../ui/Wave/Wave.jsx";

const About = () => {
    return (
        <div className="about-container">
            <h2>How it works</h2>

            <p>
                This page provides an overview of the analysis techniques
                and tools employed in our project to assess quality
                and maintainability. We utilize  approaches and tools
                to prioritize hotspots, analyze commits, and provide API endpoints
                for data retrieval.
            </p>



            <div className="hotspot-about-container" >
                <Wave
                    waveStyle="light"
                />
                <h3>Hotspot Prioritization</h3>
            </div>
        </div>
    );

}

export default About