import useCartStore from "../../../stores/CartStore";
import useAuthStore from "../../../stores/AuthStore";

import "./CheckoutBtn.css";

function CheckoutBtn() {
    const sendCartData = useCartStore((state) => state.sendCartData);
    const token = useAuthStore((state) => state.token);

    return (
        <button onClick={() => sendCartData(token)} className="total-info__group__btn">Checkout</button>
    );
}

export default CheckoutBtn;
