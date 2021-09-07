import { useEffect } from "react";

import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import SuccessDesc from "./success-desc/SuccessDesc";
import SuccessImg from "./success-img/SuccessImg";
import Footer from "../../layout/footer/Footer";

import "./PaymentSuccess.css";

import useAuthStore from "../../../stores/AuthStore";
import useCartStore from "../../../stores/CartStore";
import { clearCartItemsFromStorage } from "../../../utils/clear-cart-items-from-storage";

function PaymentSuccess() {
    const token = useAuthStore((state) => state.token);
    const currUrl = new URL(window.location.href);
    const params = new URLSearchParams(currUrl.search);
    const sessionId = params.get("sessionId");
    const orderId = params.get("orderId");

    // Make API req to update session id
    useEffect(() => {
        fetch("/api/orders/complete-checkout", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                sessionId,
                orderId
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }, [token, orderId, sessionId]);

    // Reset all cart data in store and sessionStorage after successful payment
    const resetCartState = useCartStore((state) => state.resetCartState);
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
