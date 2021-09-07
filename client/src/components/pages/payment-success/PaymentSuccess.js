import { useEffect, useState } from "react";

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

import ErrorMsg from "../../ui/error-msg/ErrorMsg";

function PaymentSuccess() {
    // Local state
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("Please wait while payment is completing.");

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
            .then((data) => setMsg(data.msg))
            .catch((err) => setError(err.error));
    }, [token, orderId, sessionId]);

    // Reset all cart data in store and sessionStorage after successful payment
    const resetCartState = useCartStore((state) => state.resetCartState);
    resetCartState();
    clearCartItemsFromStorage();

    return (
        <div className="payment-success">
            <Header />
            <MainWrapper>
                <TitleBar>{msg}</TitleBar>
                <section className="payment-success__img-section">
                    <SuccessImg />
                    {error ? <ErrorMsg error={error} /> : <SuccessDesc />}
                </section>
            </MainWrapper>
            <Footer />
        </div>
    );
}

export default PaymentSuccess;
