import { useEffect, useState } from "react";

import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import Footer from "../../layout/footer/Footer";

function Shop({ titleBarText, categoryQueryText }) {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const apiUrl = categoryQueryText === "all" ? "/api/products" : `/api/products/category?q=${categoryQueryText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="shop">
            <Header />
            <main className="shop-main-wrapper">
                <TitleBar>{titleBarText}</TitleBar>
            </main>
            <Footer />
        </div>
    );
}

export default Shop;
