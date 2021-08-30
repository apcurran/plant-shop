import { Link } from "react-router-dom";

import "./CheckoutLink.css";

function CheckoutLink() {
    return (
        <Link to="/checkout" className="checkout-link">Checkout</Link>
    );
}

export default CheckoutLink;
