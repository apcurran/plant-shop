import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import SuccessDesc from "./success-desc/SuccessDesc";
import SuccessImg from "./success-img/SuccessImg";
import Footer from "../../layout/footer/Footer";

import "./PaymentSuccess.css";

import useCartStore from "../../../stores/CartStore";
import { clearCartItemsFromStorage } from "../../../utils/clear-cart-items-from-storage";

function PaymentSuccess() {
    // Make API req to server to update payment id and order id in db order table
    const currUrl = new URL(window.location.href);
    const params = new URLSearchParams(currUrl.search);
    const sessionId = params.get("sessionId");
    const orderId = params.get("orderId");

    const resetCartState = useCartStore((state) => state.resetCartState);

    // Reset all cart data in store and sessionStorage after successful payment
    resetCartState();
    clearCartItemsFromStorage();

    return (
        <div className="payment-success">
            <Header />
            <MainWrapper>
                <TitleBar>Payment Success</TitleBar>
                <section className="payment-success__img-section">
                    <SuccessImg />
                    <SuccessDesc />
                </section>
            </MainWrapper>
            <Footer />
        </div>
    );
}

export default PaymentSuccess;
