import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import ShippingContent from "./shipping-content/ShippingContent";
import ShippingForm from "./shipping-form/ShippingForm";

import "./Checkout.css";

function Checkout() {
    return (
        <div className="checkout-page">
            <Header />
            <MainWrapper>
                <TitleBar>Checkout Details</TitleBar>
                <section className="shipping-grid-container">
                    <div className="shipping-grid__left">
                        <ShippingContent />
                    </div>
                    <div className="shipping-grid__right">
                        <ShippingForm />
                    </div>
                </section>
            </MainWrapper>
        </div>
    );
}

export default Checkout;
