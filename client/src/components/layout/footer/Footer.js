import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <section className="footer__container--left">
                <h2 className="footer__logo-title">Evergreen</h2>
                <p className="footer__creation-attribution">Created by Alex Curran</p>
            </section>
            <section className="footer__container--right">
                <div className="footer__container--right__column--left">
                    <div className="footer__container--right__column--left__group">
                        <h3 className="footer__title">About</h3>
                        <Link to="/about-us">About Us</Link>
                    </div>
                    <div className="footer__container--right__column--left__group">
                        <h3 className="footer__title">Contact</h3>
                        <Link to="/contact-us">Contact Us</Link>
                    </div>
                </div>
                <div className="footer__container--right__column--right">
                    <div className="footer__container--right__column--right__group">
                        <h3 className="footer__title">Shop</h3>
                        <Link to="/collections/house-plants">House Plants</Link>
                        <Link to="/collections/fruit-trees">Fruit Trees</Link>
                        <Link to="/collections/shade-trees">Shade Trees</Link>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
