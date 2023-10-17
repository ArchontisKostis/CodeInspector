import React from 'react';
import './Footer.css';

import {brandName, footer} from "../../data/general.json";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <a href={footer.home.url} className="footer-link" id="link-1">
                    <i className={footer.home.icon + " hover-border"}>
                        {footer.home.title}
                    </i>
                </a>

                <a href={footer.about.url} className="footer-link" id="link-2">
                    <i className={footer.about.icon + " hover-border"}>
                        {footer.about.title}
                    </i>
                </a>

                <a href={footer.apiDocs.url} className="footer-link" id="link-3">
                    <i className={footer.apiDocs.icon + " hover-border"}>
                        {footer.apiDocs.title}
                    </i>
                </a>

                <a href={footer.repo.url} className="footer-link" id="link-4">
                    <i className={footer.repo.icon + " hover-border"}>
                        {footer.repo.title}
                    </i>
                </a>

                <a href={footer.backToTop.url} className="footer-link" id="link-6">
                    <i className={footer.backToTop.icon + " hover-border"}>
                        {footer.backToTop.title}
                    </i>
                </a>

                <img
                    src={footer.uomImage.src}
                    className="footer-image"
                    alt={footer.uomImage.alt}
                />
            </div>

            <div className="footer-copyright">
                {
                    footer.footerCopyright.icon +
                    new Date().getFullYear()
                }
                <a href={footer.footerCopyright.myLink}>
                    {footer.footerCopyright.myName}
                </a>

                <a href={footer.footerCopyright.uom.url}>
                    {footer.footerCopyright.uom.text}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
