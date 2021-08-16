import "./CartBtn.css";

import useCartStore from "../../../stores/CartStore";

function CartBtn() {
    const totalQuantity = useCartStore((state) => state.totalQuantity);

    return (
        <button aria-label="Cart" className="nav__cart-btn">
            <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="nav__cart-btn__item-qty">{totalQuantity}</span>
        </button>
    );
}

export default CartBtn;
