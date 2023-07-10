import React from "react";

import './CreditsSection.css';

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
                We would like to acknowledge the contributions of the FastAPI, Python, React, and PyDriller communities,
                whose efforts have played a crucial role in the development of CodeInspectorREST and CodeInspector.
                Their contributions have enabled the creation of this tool that can help developers and promote repository mining analysis
                in the software industry.
            </article>
        </div>
    );
}

export default CreditsSection;