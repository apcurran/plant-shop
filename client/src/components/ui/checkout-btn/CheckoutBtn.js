import useCartStore from "../../../stores/CartStore";

import "./CheckoutBtn.css";

function CheckoutBtn() {
    const sendCartData = useCartStore((state) => state.sendCartData);

    return (
        <button onClick={sendCartData} className="total-info__group__btn">Checkout</button>
    );
}

export default CheckoutBtn;
