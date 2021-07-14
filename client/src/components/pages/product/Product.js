import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./Product.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import ProductSizeBtn from "./product-size-btn/ProductSizeBtn";

function Product() {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [startingPrice, setStartingPrice] = useState("");
    const [prodSizingInfo, setProdSizingInfo] = useState([]);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                setStartingPrice(data.productExtraInfo[0].price);
                setProdSizingInfo(data.productExtraInfo);
            })
            .catch((err) => console.error(err));
    }, [productId]);

    const prodBtns = prodSizingInfo.map((prod) => {
        return <ProductSizeBtn key={prod.productExtraInfoId} prodSizeGallons={prod.size} prodSizePrice={prod.price} />
    });

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
                    <section className="product__content">
                        <div className="product__content__heading-container">
                            <h2 className="product__content__title">{productData.title}</h2>
                            <p className="product__content__starting-price-para">
                                starting at <span className="product__content__starting-price-para__price">${startingPrice}</span>
                            </p>
                        </div>
                        <h3 className="product__content__size-title">Size</h3>
                        {prodBtns}
                        <div className="product__content__add-info-container">
                            <button className="product__content__add-btn">Add to Cart</button>
                            <span className="product__content__selected-price">Selected Price Here</span>
                        </div>
                        <p className="product__content__desc">{productData.description}</p>
                        <div className="product__content__info-article-container">
                            <article className="product__content__info-article product__content__shipping-info">
                                <h3 className="product__content__shipping-info__title">Free Shipping</h3>
                                <p className="product__content__shipping-info__desc">for all orders.</p>
                            </article>
                            <article className="product__content__info-article product__content__warranty-info">
                                <h3 className="product__content__warranty-info__title">One Year Warranty</h3>
                                <p className="product__content__warranty-info__desc">No hassle warranty against defects.</p>
                            </article>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Product;
