import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <a href="#" className="footer-link" id="link-1">
                    <i className="bi bi-house-door-fill hover-border"> Home</i>
                </a>

                <a href="#" className="footer-link" id="link-2">
                    <i className="bi bi-info-circle-fill hover-border"> How it works</i>
                </a>

                <a href="http://localhost:8000/redoc" className="footer-link" id="link-3">
                    <i className="bi bi-plugin hover-border"> API Redoc</i>
                </a>

                <a href="#" className="footer-link" id="link-4">
                    <i className="bi bi-github hover-border"> Github Repository</i>
                </a>

                <a href="#" className="footer-link" id="link-5">
                    <i className="bi bi-stars hover-border"> Credits & Acknowledgements</i>
                </a>

                <a href="#top" className="footer-link" id="link-6">
                    <i className="bi bi-arrow-up-circle-fill hover-border"> Back to top</i>
                </a>

                <img src="https://www.uom.gr/site/images/logos/UOMLOGOEN.jpg" className="footer-image" alt="UOM Logo" />
            </div>
            <div className="footer-copyright">
                &copy; {new Date().getFullYear()}
                <a href="https://www.linkedin.com/in/archontis-e-kostis-202384223/">Archontis E. Kostis</a>

                <a href="https://www.uom.gr/dai">University of Macedonia, Department of Applied Informatics</a>
            </div>
        </footer>
    );
};

export default Footer;
