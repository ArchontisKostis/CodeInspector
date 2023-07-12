import React from 'react';
import homeImg from "../../assets/svg/home/home-banner-1.svg";
import {Link} from "react-router-dom";

import './TryTheToolBanner.css';
import Wave from "../../ui/Wave/Wave.jsx";

export default function TryTheToolBanner() {
    return (
        <>
            <div className="try-the-tool-container">
                <section className="try-the-tool-img">
                    <img src={homeImg} alt="Try the tool" />
                    <p>
                        <a href="https://www.freepik.com/free-vector/bug-fixing-concept-illustration_7769294.htm#query=Software%20tester%20illustration&position=5&from_view=search&track=ais">Image by storyset</a> on Freepik
                    </p>
                </section>

                <section className="try-the-tool-text">
                    <h2>Elevate your Codebase Analysis</h2>
                    <article>
                        Take your codebase analysis to the next level with CodeInspector.
                        Our cutting-edge API provides comprehensive hotspot prioritization and commit analysis,
                        helping you make informed decisions to improve software quality. Dive deep into your code,
                        detect issues, and streamline development. Try our powerful web app today!
                    </article>
                    <br/>
                    <Link to="/tool" className="tool-btn">
                        <i className="bi bi-arrow-right-circle-fill"> Try the Tool! </i>
                    </Link>
                </section>
            </div>


        </>
    );
}