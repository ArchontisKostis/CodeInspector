import React from "react";

import './CreditsSection.css';
import Wave from "../../ui/Wave/Wave.jsx";

const CreditsSection = () => {
    return (
        <div className="credits-section">
            <h2>Credits</h2>
            <article>
                CodeInspector - CodeInspectorREST was created as part of Archontis E. Kostis'
                Bachelor Thesis at the University of Macedonia, under the guidance and support of Dr. Alexander
                Hatzigeorgiou, Dean of the Department of Applied Informatics.
            </article>

            <article>
                I would like to extend my heartfelt gratitude to all the individuals who have provided support and valuable advice
                throughout the development of this Web App, which is an integral part of my bachelor's thesis. Their encouragement and
                guidance have been instrumental in the successful completion of this project.
            </article>

            <article>
                This Web App was developed using several libraries and frameworks and tools, which have played a pivotal role in enhancing its functionality and performance.
                I would like to express my gratitude to the creators and maintainers
            </article>

            <h3 className="made-with-header">Made With:</h3>

            <div className="made-with-container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    className="made-with-logo"
                    alt="React Logo"
                />

                <img
                    src="https://fastapi.tiangolo.com/img/icon-white.svg"
                    className="made-with-logo"
                    alt="FastAPI Logo"
                />

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Docker_%28container_engine%29_logo_%28cropped%29.png"
                    className="made-with-logo wide"
                    alt="React Logo"
                />
            </div>

            <Wave
                waveStyle="dark red-bg"
            />
        </div>
    );
}

export default CreditsSection;