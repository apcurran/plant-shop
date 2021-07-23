import { useEffect } from "react";

import "./ProductsSection.css";
import ProductCard from "./product-card/ProductCard";

import useProductsStore from "../../../../stores/ProductsStore";

function ProductsSection({ categoryQueryText }) {
    const products = useProductsStore((state) => state.products);
    const setProducts = useProductsStore((state) => state.setProducts);

    useEffect(() => {
        const apiUrl = categoryQueryText === "all" ? "/api/products" : `/api/products/category?q=${categoryQueryText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, [categoryQueryText, setProducts]);


    return (
        <section className="shop__products-section">
            <h2 className="shop__products-section__title">Our Stock</h2>
            <div className="shop__products-section__product-card-grid-wrapper">
                {products.map((productData) => (
                    <ProductCard key={productData.productId} productData={productData} />
                ))}
            </div>
        </section>
    );
}

export default ProductsSection;
