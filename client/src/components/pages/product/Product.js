import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Product.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";

function Product() {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((err) => console.error(err));
    }, [productId]);

    return (
        <div className="product">
            <Header />
            <main className="product-main-wrapper">
                <TitleBar>{productData.category}</TitleBar>
            </main>
        </div>
    );
}

export default Product;
