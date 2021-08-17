import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import CartTable from "./cart-table/CartTable";

function ShoppingCart() {
    return (
        <div className="cart-page">
            <Header />
            <MainWrapper>
                <TitleBar>Shopping Cart</TitleBar>
                <CartTable />
            </MainWrapper>
        </div>
    );
}

export default ShoppingCart;
