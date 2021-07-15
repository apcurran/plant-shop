import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./ProductCard.css";

function ProductCard({ productData }) {
    return (
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
    );
}

export default ProductCard;
