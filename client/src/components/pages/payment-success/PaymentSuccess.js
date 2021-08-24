import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import SuccessDesc from "./success-desc/SuccessDesc";
import SuccessImg from "./success-img/SuccessImg";
import Footer from "../../layout/footer/Footer";

import "./PaymentSuccess.css";

function PaymentSuccess() {
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
