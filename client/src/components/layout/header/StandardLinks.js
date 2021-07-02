import { NavLink } from "react-router-dom";

function StandardLinks() {
    return (
        <ul className="nav__standard-links-list">
            <li className="nav__item">
                <NavLink to="/about" className="nav__link">About</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/shop" className="nav__link">Shop</NavLink>
            </li>
        </ul>
    );
}

export default StandardLinks;
