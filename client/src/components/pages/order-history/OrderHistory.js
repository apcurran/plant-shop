import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import TitleBar from "../../ui/title-bar/TitleBar";

function OrderHistory() {
    return (
        <div className="order-history">
            <Header />
            <MainWrapper>
                <TitleBar>Order History</TitleBar>
                
            </MainWrapper>
        </div>
    );
}

export default OrderHistory;
