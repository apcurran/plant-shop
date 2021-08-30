import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";

function Checkout() {
    return (
        <div className="checkout-page">
            <Header />
            <MainWrapper>
                <TitleBar>Checkout Details</TitleBar>
            </MainWrapper>
        </div>
    );
}

export default Checkout;
