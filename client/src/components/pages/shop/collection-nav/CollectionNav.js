import { NavLink } from "react-router-dom";

import "./CollectionNav.css";

function CollectionNav() {
    return (
        <nav className="shop__collection-nav">
            <ul className="shop__collection-nav__list">
                <li className="shop__collection-nav__list__item">
                    <NavLink exact to="/collections">All Plants</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/house-plants">House Plants</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/fruit-trees">Fruit Trees</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/shade-trees">Shade Trees</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default CollectionNav;
