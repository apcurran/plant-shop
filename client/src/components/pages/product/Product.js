import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

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
                <div className="product__grid-wrapper">
                    <figure className="product__fig">
                        <Image publicId={productData.publicId} alt={productData.altText} width={productData.width} height={productData.height} className="product__fig__img">
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                    </figure>
                </div>
            </main>
        </div>
    );
}

export default Product;
