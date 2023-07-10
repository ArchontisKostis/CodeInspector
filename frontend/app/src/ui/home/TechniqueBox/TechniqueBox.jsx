import React from "react";

import './TechniqueBox.css';

const TechniqueBox = ({ title, description }) => {
    return (
        <div className="technique-box">
            <h2 className="technique-title">{title}</h2>
            <article className="technique-desc">
                {description}
            </article>
        </div>
    );
}

export default TechniqueBox;