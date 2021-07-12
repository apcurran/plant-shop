import { NavLink } from "react-router-dom";

import "./CollectionNav.css";

function CollectionNav() {
    return (
        <nav className="shop__collection-nav">
            <ul className="shop__collection-nav__list">
                <li className="shop__collection-nav__list__item">
                    <NavLink exact to="/collections" className="shop__collection-nav__list__link">All Plants</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/house-plants" className="shop__collection-nav__list__link">House Plants</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/fruit-trees" className="shop__collection-nav__list__link">Fruit Trees</NavLink>
                </li>
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections/shade-trees" className="shop__collection-nav__list__link">Shade Trees</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default CollectionNav;
