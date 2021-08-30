import useCartStore from "../../../stores/CartStore";
import useAuthStore from "../../../stores/AuthStore";

import "./PaymentBtn.css";

function PaymentBtn() {
    const sendCartData = useCartStore((state) => state.sendCartData);
    const token = useAuthStore((state) => state.token);

    return (
        <button onClick={() => sendCartData(token)} className="total-info__group__btn">Proceed to Payment</button>
    );
}

export default PaymentBtn;
