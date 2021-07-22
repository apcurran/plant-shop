import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import useAuthStore from "../../../../../stores/AuthStore";

import "./ProductCard.css";
import AdminDeleteBtn from "./admin-delete-btn/AdminDeleteBtn";

function ProductCard({ productData, deleteProductHandler, isAdmin, adminToken }) {
    // const userInfo = useAuthStore((state) => state.user);
    // const adminToken = useAuthStore((state) => state.token);
    const adminDeleteBtn = isAdmin ? <AdminDeleteBtn deleteProductHandler={deleteProductHandler} productId={productData.productId} adminToken={adminToken} /> : null;

    return (
        <div className="shop__product-outer-wrapper">
            <Link to={{pathname: `/collections/${productData.productId}`}} className="shop__products-section__link">
                <article className="shop__products-section__card">
                    <figure className="shop__products-section__card__fig">
                        <Image publicId={productData.publicId} alt={productData.altText} className="shop__products-section__card__img" loading="lazy" width={productData.width} height={productData.height}>
                            <Transformation width="400" height="600" crop="fill" quality="auto" fetchFormat="auto" />
                        </Image>
                    </figure>
                    <div className="shop__products-section__card__content-group">
                        <h3 className="shop__products-section__card__title">{productData.title}</h3>
                        <span className="shop__products-section__card__price">${productData.price}</span>
                    </div>
                </article>
            </Link>
            {adminDeleteBtn}
        </div>
    );
}

export default ProductCard;
