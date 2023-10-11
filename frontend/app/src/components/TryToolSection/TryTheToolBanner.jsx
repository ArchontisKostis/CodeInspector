import React from 'react';
import homeImg from "../../assets/svg/home/home-banner-1.svg";
import {Link} from "react-router-dom";

import './TryTheToolBanner.css';
import Wave from "../../ui/Wave/Wave.jsx";

import data from "../../data/pages/home.json";

export default function TryTheToolBanner() {
    return (
        <>
            <div className="try-the-tool-container">
                <section className="try-the-tool-img">
                    <img src={homeImg} alt="Try the tool" />
                    <p>
                        <a href={data.tryTheToolSection.image.src}>
                            {data.tryTheToolSection.image.freepikAttribution}
                        </a>
                    </p>
                </section>

                <section className="try-the-tool-text">
                    <h2></h2>
                    <article>
                        {data.tryTheToolSection.text.article}
                    </article>
                    <br/>
                    <Link to="/tool" className="tool-btn">
                        <i className={data.tryTheToolSection.text.buttonIcon}>
                            {data.tryTheToolSection.text.buttonTxt}
                        </i>
                    </Link>
                </section>
            </div>


        </>
    );
}