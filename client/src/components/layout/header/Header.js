import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import StandardLinks from "./StandardLinks";
import SignedOutLinks from "./SignedOutLinks";
import CartBtn from "../../ui/cart-btn/CartBtn";

import useAuthStore from "../../../stores/AuthStore";

function Header({ homePageRendering }) {
    const loggedInUserInfo = useAuthStore(useCallback((state) => state.user, []));
    console.log(loggedInUserInfo);
    const displayedLinks = Object.keys(loggedInUserInfo).length > 0 ? <span>Hello, {loggedInUserInfo.firstName}!</span> : <SignedOutLinks />;
    // If the About page is rendering from the current route, apply CSS class
    const homePageHeaderClass = Boolean(homePageRendering) ? "header--home" : "";

    return (
        <header className={`header ${homePageHeaderClass}`}>
            <nav className="nav">
                <StandardLinks />
                <NavLink to="/" className="nav__logo-link">
                    Evergreen
                </NavLink>
                <div className="nav__right-group">
                    {displayedLinks}
                    <CartBtn />
                </div>
            </nav>
        </header>
    );
}

export default Header;
