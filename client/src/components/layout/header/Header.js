import { NavLink } from "react-router-dom";

import "./Header.css";
import StandardLinks from "./StandardLinks";
import SignedOutLinks from "./SignedOutLinks";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <StandardLinks />
                <NavLink to="/" className="nav__logo-link">
                    Evergreen
                </NavLink>
                <SignedOutLinks />
            </nav>
        </header>
    );
}

export default Header;
