import { NavLink } from "react-router-dom";

import "./Header.css";
import StandardLinks from "./StandardLinks";
import SignedOutLinks from "./SignedOutLinks";
import CartBtn from "../../ui/cart-btn/CartBtn";

function Header({ homePageRendering }) {
    // If the About page is rendering from the current route, apply CSS class
    const headerAboutPageClass = Boolean(homePageRendering) ? "header--about" : "";

    return (
        <header className={`header ${headerAboutPageClass}`}>
            <nav className="nav">
                <StandardLinks />
                <NavLink to="/" className="nav__logo-link">
                    Evergreen
                </NavLink>
                <div className="nav__right-group">
                    <SignedOutLinks />
                    <CartBtn />
                </div>
            </nav>
        </header>
    );
}

export default Header;
