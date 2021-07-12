import { useEffect, useState } from "react";

import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import CollectionNav from "./collection-nav/CollectionNav";
import ShopHero from "./shop-hero/ShopHero";
import ProductsSection from "./products-section/ProductsSection";
import Footer from "../../layout/footer/Footer";

function Shop({ titleBarText, categoryQueryText }) {
    const [productsData, setProductData] = useState([]);

    useEffect(() => {
        const apiUrl = categoryQueryText === "all" ? "/api/products" : `/api/products/category?q=${categoryQueryText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((err) => console.error(err));
    }, [categoryQueryText]);

    return (
        <div className="shop">
            <Header />
            <main className="shop-main-wrapper">
                <TitleBar>{titleBarText}</TitleBar>
                <div className="shop-inner-wrapper">
                    <CollectionNav />
                    <div className="shop-inner-wrapper--right">
                        <ShopHero categoryQueryText={categoryQueryText} />
                        <ProductsSection productsData={productsData} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Shop;
