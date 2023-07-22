import React from "react";

import "./About.css";
import Wave from "../../ui/Wave/Wave.jsx";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h2>How it works</h2>

                <p>
                    This page provides an overview of the analysis techniques
                    and tools employed in our project to assess quality
                    and maintainability. We utilize  approaches and tools
                    to prioritize hotspots, analyze commits, and provide API endpoints
                    for data retrieval.
                </p>

                <Wave
                    waveStyle="light"
                />
            </div>

            <div className="hotspot-about-container" >

                <h2>Hotspot Prioritization</h2>
                <p>
                    Hotspot prioritization enables us to identify critical areas in a
                    codebase that require immediate attention. By following the steps outlined
                    in this section, we can effectively prioritize code and focus on files
                    that exhibit high complexity and frequent changes.
                </p>

                <div className="simple-info-box">
                    <h3>Hotspot Finding</h3>

                    <p>
                        To ensure accurate prioritization, we perform hotspot finding to identify
                        areas of the codebase that exhibit significant complexity and frequent changes.
                        This step allows us to pinpoint critical sections that require closer examination.
                    </p>
                </div>

                <div className="simple-info-box">
                    <h3>Calculation of Hotspot Priority</h3>

                    <p>
                        To calculate the priority of hotspots, we adopt an approach similar to the Eisenhower Matrix. In our context, we adapt the matrix to prioritize hotspots based on their complexity and code churn. <br/>
                        By considering both complexity and churn metrics, we assess the significance and impact of each hotspot on software quality and maintainability. The priority calculation takes into account the relative position of a hotspot's metrics compared to the maximum CC and churn values observed in the project.
                    </p>
                </div>

                <Wave waveStyle="dark" />
            </div>

            <div className="commit-about-container" >
                <h2>Commit Analysis using DMM</h2>
                <p>
                    The commit analysis utilizes the Delta Maintainability Model (DMM)
                    and allows us to evaluate the impact of individual commits on the overall
                    maintainability of the software system. By following the steps outlined in this
                    section, we gain insights into the maintainability and risk associated with commits.
                </p>

                <div className="simple-info-box">
                    <h3>Commit Retrieval</h3>

                    <p>
                        To ensure accurate prioritization, we perform hotspot finding to identify areas of the
                        codebase that exhibit significant complexity and frequent changes. This step allows us to
                        pinpoint critical sections that require closer examination.
                    </p>
                </div>

                <div className="simple-info-box">
                    <h3>DMM Metrics Calculation</h3>

                    <p>
                        To assess the maintainability implications of commits, we utilize the Open Source Delta Maintainability Model (OS-DMM) implemented by PyDriller. This model, described in a paper at TechDebt 2019 [DiBiase2019], provides insights into the maintainability of code changes. <br/>
                        The DMM metrics take into account unit size, unit complexity, and unit interfacing.
                    </p>
                </div>

                <div className="simple-info-box">
                    <h3>Change Categorization</h3>

                    <p>
                        Based on the computed DMM complexity value, we categorize each commit into different categories.
                        <br/>
                        To assess the risk category based on the computed DMM value, we have defined several categories, such as EXCELLENT, GOOD, FAIR, POOR, and UNKNOWN. These categories provide an indication of the maintainability implications of each commit.
                    </p>
                </div>

                <Wave waveStyle="light" />
            </div>
        </div>
    );

}

export default About