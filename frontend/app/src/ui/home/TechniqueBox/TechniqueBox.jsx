import React from "react";

import './TechniqueBox.css';

const TechniqueBox = ({ title, description }) => {
    return (
        <div className="technique-box">
            <h2>{title}</h2>
            <article>
                {description}
            </article>
        </div>
    );
}

export default TechniqueBox;