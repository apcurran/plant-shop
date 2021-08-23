import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import SuccessDesc from "./success-desc/SuccessDesc";
import SuccessAnimation from "./success-animation/SuccessAnimation";

function PaymentSuccess() {
    return (
        <div className="payment-success">
            <Header />
            <MainWrapper>
                <TitleBar>Payment Success</TitleBar>
                <SuccessDesc />
                <SuccessAnimation />
            </MainWrapper>
        </div>
    );
}

export default PaymentSuccess;
