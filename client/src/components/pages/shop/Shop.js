import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import Footer from "../../layout/footer/Footer";

function Shop() {
    return (
        <div className="shop">
            <Header />
            <main className="shop-main-wrapper">
                <TitleBar>All Collections</TitleBar>
            </main>
            <Footer />
        </div>
    );
}

export default Shop;
