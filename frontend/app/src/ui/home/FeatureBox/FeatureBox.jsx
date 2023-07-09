import React from "react";

import "./FeatureBox.css";

const FeatureBox = (props) => {
    const { title, icon, description } = props;

    return (
        <>
        <div className="feature-box-container">
            <i className={icon}></i>
            <h2 className="feature-box-title">{title}</h2>
            <p>
                {description}
            </p>
        </div>
        </>
    );
}

export default FeatureBox;