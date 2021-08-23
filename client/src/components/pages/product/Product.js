import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./Product.css";
import Header from "../../layout/header/Header";
import TitleBar from "../../ui/title-bar/TitleBar";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import ProductSizeBtn from "./product-size-btn/ProductSizeBtn";

import useCartStore from "../../../stores/CartStore";

function Product() {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [startingPrice, setStartingPrice] = useState("");
    const [prodSizingInfo, setProdSizingInfo] = useState([]);
    const [selectedProductExtraInfo, setSelectedProductExtraInfo] = useState({ prodExtraInfoId: "", prodExtraInfoSize: null, prodExtraInfoPrice: null });

    // Store func
    const addItemToCart = useCartStore((state) => state.addItemToCart);
    const cartItems = useCartStore((state) => state.items);

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

    function addItemToCartHandler(prodExtraInfoId, prodExtraInfoSize, prodExtraInfoPrice) {
        // Check if user has clicked an item size/price
        if (prodExtraInfoId === "") return;

        const currItemObj = {
            productId: productId,
            productExtraInfoId: prodExtraInfoId,
            title: productData.title,
            size: prodExtraInfoSize,
            price: prodExtraInfoPrice,
            imgPublicId: productData.publicId,
            imgAltTxt: productData.altText,
            imgWidth: productData.width,
            imgHeight: productData.height
        };

        // Add item obj to global cart store
        addItemToCart(currItemObj);
    }

    const prodBtns = prodSizingInfo.map((prod) => {
        return <ProductSizeBtn
                    setSelectedProductExtraInfo={setSelectedProductExtraInfo}
                    key={prod.productExtraInfoId}
                    prodExtraInfoId={prod.productExtraInfoId}
                    prodSizeGallons={prod.size}
                    prodSizePrice={prod.price}
                />;
    });
    const selectedPriceSpan = selectedProductExtraInfo.prodExtraInfoPrice ?
                                <span className="product__content__selected-price">${selectedProductExtraInfo.prodExtraInfoPrice}</span>
                                :
                                <span className="product__content__selected-price">Please select an item before adding to cart.</span>;

    return (
        <div className="product">
            <Header />
            <MainWrapper>
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
                            <button
                                onClick={() => addItemToCartHandler(selectedProductExtraInfo.prodExtraInfoId, selectedProductExtraInfo.prodExtraInfoSize, selectedProductExtraInfo.prodExtraInfoPrice)}
                                className="product__content__add-btn"
                            >
                                Add to Cart
                            </button>
                            {selectedPriceSpan}
                        </div>
                        <p className="product__content__desc">{productData.description}</p>
                        <div className="product__content__info-article-container">
                            <article className="product__content__info-article product__content__shipping-info">
                                <h3 className="product__content__shipping-info__title">Free Shipping</h3>
                                <p className="product__content__shipping-info__desc">for all orders.</p>
                                <svg className="product__box-icon shipping-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M476.158 231.363l-13.259-53.035c3.625-.77 6.345-3.986 6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136 0-16.568 7.432-16.568 16.568V256a8.017 8.017 0 0016.034 0V110.63c0-.295.239-.534.534-.534h307.841c.295 0 .534.239.534.534v145.372a8.017 8.017 0 0016.034 0v-9.088h94.569l.021.002.022-.001c11.637.008 21.518 7.646 24.912 18.171h-24.928a8.017 8.017 0 00-8.017 8.017v17.102c0 13.851 11.268 25.119 25.119 25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-3.86v-60.393a8.017 8.017 0 00-16.034 0v60.391H192.817c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205H50.772a.534.534 0 01-.534-.534v-17.637h34.739a8.017 8.017 0 000-16.034H8.017a8.017 8.017 0 000 16.034h26.188v17.637c0 9.136 7.432 16.568 16.568 16.568h43.304c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772s50.772-22.776 50.772-50.772c0-.18-.012-.356-.014-.534h180.67c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772 27.995 0 50.772-22.776 50.772-50.772 0-.18-.012-.356-.014-.534h26.203a8.017 8.017 0 008.017-8.017v-85.511c.001-21.112-15.576-38.653-35.841-41.738zm-100.976-87.062h60.392c9.725 0 17.637 7.912 17.637 17.637v.534h-78.029v-18.171zm0 86.58v-52.376h71.235l13.094 52.376h-84.329zM144.835 401.904c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm282.188 0c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm68.944-102.614h-9.086c-5.01 0-9.086-4.076-9.086-9.086v-9.086h18.171v18.172z" /><path d="M144.835 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM427.023 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM332.96 316.393H213.244a8.017 8.017 0 000 16.034H332.96a8.017 8.017 0 000-16.034zM127.733 282.188H25.119a8.017 8.017 0 000 16.034h102.614a8.017 8.017 0 000-16.034zM278.771 173.37a8.017 8.017 0 00-11.337.001l-71.292 71.291-37.087-37.087a8.016 8.016 0 00-11.337 0 8.016 8.016 0 000 11.337l42.756 42.756c1.565 1.566 3.617 2.348 5.668 2.348s4.104-.782 5.668-2.348l76.96-76.96a8.018 8.018 0 00.001-11.338z" /></svg>
                            </article>
                            <article className="product__content__info-article product__content__warranty-info">
                                <h3 className="product__content__warranty-info__title">One Year Warranty</h3>
                                <p className="product__content__warranty-info__desc">No hassle warranty against defects.</p>
                                <svg className="product__box-icon warranty-icon" xmlns="http://www.w3.org/2000/svg" height="511pt" viewBox="0 0 511.998 511" width="511pt"><path d="M511.84 226.781v-.004c-.836-7.976-4.969-15.328-11.336-20.199l-29.14-22.687 10.952-36.141a29.392 29.392 0 00-2.66-23.121 29.388 29.388 0 00-18.691-13.867l-36.66-8.559-4.68-37.351c-1.004-8-5.316-15.305-11.832-20.032-6.523-4.746-14.809-6.593-22.719-5.07l-36.972 7.09-19.473-32.223C320.879 1.793 304.605-3.05 290.785 3.34c-.973.45-1.91.988-2.726 1.566l-32.09 22.352-30.895-21.52a29.388 29.388 0 00-22.804-4.605c-7.883 1.672-14.797 6.594-18.965 13.492L163.84 46.844l-36.977-7.094c-7.918-1.516-16.195.332-22.707 5.066A29.358 29.358 0 0092.32 64.852l-4.68 37.355-38.773 9.05-1.82.595-.672.293c-14.086 6.16-21.133 21.136-16.75 35.605l10.95 36.14-30.391 23.641-1.762 1.531-.496.543c-10.2 11.141-10.598 27.993-.95 39.258l23.794 28.453-19.286 34.997-.77 1.75-.222.652c-4.808 14.37 1.742 29.988 15.235 36.32l34.078 15.992-3.192 37.508a29.365 29.365 0 007.41 22.063 29.385 29.385 0 0021.168 9.68l37.637.75 12.344 35.558a29.345 29.345 0 0015.738 17.14c7.36 3.278 15.84 3.364 23.278.235l34.69-14.621 27.231 29.058 1.426 1.27.55.41c5.38 3.973 11.665 5.918 17.892 5.918 7.878 0 15.66-3.117 21.351-9.191l25.742-27.465 34.696 14.625a29.381 29.381 0 0023.257-.235 29.356 29.356 0 0015.747-17.14l12.347-35.563 39.813-.793 1.89-.207.68-.136c14.844-3.028 25.09-16.508 23.828-31.352l-3.187-37.512 34.082-15.992a29.37 29.37 0 0015.398-17.45 29.377 29.377 0 00-2.203-23.167l-18.242-33.102 23.797-28.453a29.367 29.367 0 006.867-22.082zm-59.043 37.668c-4.715 5.567-5.52 13.57-1.992 19.965l21.925 39.79-41.128 19.3c-6.668 3.133-10.727 10.168-10.106 17.508l3.848 45.265-45.422.907c-7.363.148-13.938 4.921-16.352 11.882l-14.898 42.918-41.86-17.644c-6.789-2.86-14.734-1.176-19.777 4.203l-31.066 33.148-31.067-33.152c-3.402-3.633-8.132-5.578-12.937-5.578-2.309 0-4.633.45-6.832 1.379l-41.867 17.644-14.895-42.906c-2.41-6.965-8.984-11.746-16.355-11.894l-45.426-.907 3.847-45.265c.626-7.34-3.437-14.375-10.105-17.508l-41.125-19.3 21.926-39.786c3.531-6.402 2.722-14.402-1.996-19.973l-28.86-34.511 35.36-27.508c5.789-4.465 8.25-12.137 6.125-19.13L58.59 139.82l44.246-10.336c7.168-1.675 12.602-7.707 13.523-15.02l5.649-45.077 44.625 8.558c7.234 1.383 14.648-1.922 18.46-8.222l23.493-38.883 37.277 25.96c6.047 4.212 14.172 4.216 20.215 0l37.277-25.964 23.497 38.875c3.804 6.309 11.234 9.617 18.468 8.23l44.618-8.558 5.648 45.074c.914 7.309 6.348 13.348 13.527 15.027l44.242 10.332-13.175 43.477c-2.121 7.008.343 14.676 6.132 19.137l35.344 27.52zm0 0" /><path d="M257.563 128.781c-70.301 0-127.497 57.192-127.497 127.496 0 70.301 57.196 127.496 127.496 127.496 70.305 0 127.5-57.195 127.5-127.496 0-70.304-57.199-127.496-127.5-127.496zm0 224.969c-53.747 0-97.477-43.727-97.477-97.473 0-53.75 43.73-97.476 97.476-97.476 53.75 0 97.477 43.726 97.477 97.476 0 53.746-43.726 97.473-97.476 97.473zm0 0" /><path d="M294.21 216.691l-59.222 59.22-16.07-16.075c-5.863-5.86-15.367-5.86-21.227 0-5.863 5.863-5.863 15.367 0 21.23l26.684 26.684a14.954 14.954 0 0010.613 4.398c3.84 0 7.684-1.464 10.614-4.398l69.835-69.832c5.86-5.863 5.86-15.367 0-21.227-5.863-5.863-15.367-5.863-21.226 0zm0 0" /></svg>
                            </article>
                        </div>
                    </section>
                </div>
            </MainWrapper>
        </div>
    );
}

export default Product;
