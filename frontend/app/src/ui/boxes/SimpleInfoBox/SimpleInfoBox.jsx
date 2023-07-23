import React from "react";

import "./SimpleInfoBox.css";

const SimpleInfoBox = (props) => {
    const { title, content } = props;

    return (
        <div className="simple-info-box">
            <h3>{title}</h3>

            <p>
                {content}
            </p>
        </div>
    );
}

export default SimpleInfoBox;