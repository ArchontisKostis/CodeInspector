// Home Page Component
// Description: This is the home page component. It is the first page that the user sees when they visit the website.

import React from 'react';

import './Home.css';
import homeImg from '../../assets/svg/home/home-banner-1.svg';
import {Link} from "react-router-dom";
import TryTheToolBanner from "../../components/TryToolSection/TryTheToolBanner.jsx";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection.jsx";
import TechniquesSection from "../../components/TechniquesSection/TechniquesSection.jsx";
import CreditsSection from "../../components/CreditsSection/CreditsSection.jsx";


const Home = (props) => {

    return (
        <>
            <div className="home-container">

                <TryTheToolBanner />

                <FeaturesSection />

                <TechniquesSection />

                <CreditsSection />
            </div>
        </>
    );
}

export default Home;