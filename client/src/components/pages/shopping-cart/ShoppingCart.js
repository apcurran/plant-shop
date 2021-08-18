import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import CartTable from "./cart-table/CartTable";

import useCartStore from "../../../stores/CartStore";

function ShoppingCart() {
    const items = useCartStore((state) => state.items);
    console.log(items);

    return (
        <div className="cart-page">
            <Header />
            <MainWrapper>
                <TitleBar>Shopping Cart</TitleBar>
                <CartTable items={items} />
            </MainWrapper>
        </div>
    );
}

export default ShoppingCart;
