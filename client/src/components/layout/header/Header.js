import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import StandardLinks from "./StandardLinks";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import CartBtn from "../../ui/cart-btn/CartBtn";

import useAuthStore from "../../../stores/AuthStore";

function Header({ homePageRendering }) {
    // Auth store state
    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useAuthStore((state) => state.setUser);
    const userInfo = useAuthStore(useCallback((state) => state.user, []));

    const displayedLinks = Object.keys(userInfo).length > 0 ? <SignedInLinks setToken={setToken} setUser={setUser} userInfo={userInfo} /> : <SignedOutLinks />;
    // If the Home page is rendering from the current route, apply CSS class
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
