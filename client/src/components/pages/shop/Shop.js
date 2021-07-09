import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";

function Shop() {
    return (
        <div className="shop">
            <Header />
            <main className="shop-main-wrapper">
                <TitleBar>All Collections</TitleBar>
            </main>
        </div>
    );
}

export default Shop;
