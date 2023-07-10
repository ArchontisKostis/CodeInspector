import React from "react";

import './Wave.css';

import wave from "../../assets/svg/waves/wave-light-one.svg";

const Wave = (props) => {
    const { waveStyle } = props;


    return (
        <div className={"wave-container " + waveStyle} >
            <img src="" className={"wave-svg " + waveStyle}></img>
        </div>
    );
}

export default Wave;