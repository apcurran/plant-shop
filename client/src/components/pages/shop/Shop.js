import { useEffect, useState } from "react";

import "./Shop.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import CollectionNav from "./collection-nav/CollectionNav";
import ShopHero from "./shop-hero/ShopHero";
import ProductsSection from "./products-section/ProductsSection";
import Footer from "../../layout/footer/Footer";

import useAuthStore from "../../../stores/AuthStore";

function Shop({ titleBarText, categoryQueryText }) {
    // Store data
    const userInfo = useAuthStore((state) => state.user);
    const adminToken = useAuthStore((state) => state.token);
    // Local state
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        const apiUrl = categoryQueryText === "all" ? "/api/products" : `/api/products/category?q=${categoryQueryText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setProductsData(data))
            .catch((err) => console.error(err));
    }, [categoryQueryText]);

    async function deleteProductHandler(productId, adminToken) {
        try {
            await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            // Update local state after successful deletion
            const updatedProductsData = productsData.filter((product) => product.productId !== Number(productId));

            setProductsData(updatedProductsData);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="shop">
            <Header />
            <main className="shop-main-wrapper">
                <TitleBar>{titleBarText}</TitleBar>
                <div className="shop-inner-wrapper">
                    <CollectionNav />
                    <div className="shop-inner-wrapper--right">
                        <ShopHero categoryQueryText={categoryQueryText} />
                        <ProductsSection productsData={productsData} deleteProductHandler={deleteProductHandler} isAdmin={userInfo.isAdmin} adminToken={adminToken} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Shop;
