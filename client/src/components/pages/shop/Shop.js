import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import CollectionNav from "./collection-nav/CollectionNav";
import ShopHero from "./shop-hero/ShopHero";
import ProductsSection from "./products-section/ProductsSection";
import Footer from "../../layout/footer/Footer";

function Shop({ titleBarText, categoryQueryText }) {
    return (
        <div className="shop">
            <Header />
            <MainWrapper>
                <TitleBar>{titleBarText}</TitleBar>
                <div className="shop-inner-wrapper">
                    <CollectionNav />
                    <div className="shop-inner-wrapper--right">
                        <ShopHero categoryQueryText={categoryQueryText} />
                        <ProductsSection categoryQueryText={categoryQueryText} />
                    </div>
                </div>
            </MainWrapper>
            <Footer />
        </div>
    );
}

export default Shop;
