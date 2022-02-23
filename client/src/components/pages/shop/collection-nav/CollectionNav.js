import { NavLink, Link } from "react-router-dom";

import useAuthStore from "../../../../stores/AuthStore";

import "./CollectionNav.css";

function CollectionNav() {
    // Store state
    const isAdmin = useAuthStore((state) => state.user.isAdmin);

    const adminAddProductLink = isAdmin ? (
        <li className="shop__collection-nav__list__item">
            <Link to="/admin/collections/add-product" className="shop__collections-nav__list__link admin-add-product-link">Add Product</Link>
        </li>
    ) : null;

    return (
        <nav className="shop__collection-nav">
            <ul className="shop__collection-nav__list">
                {adminAddProductLink}
                <li className="shop__collection-nav__list__item">
                    <NavLink to="/collections" className="shop__collection-nav__list__link">All Plants</NavLink>
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
