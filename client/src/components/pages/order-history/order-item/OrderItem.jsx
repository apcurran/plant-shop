import { AdvancedImage } from "@cloudinary/react";

import { cld } from "@utils/cloudinary-setup";

import "./OrderItem.css";
import { fill } from "@cloudinary/url-gen/actions/resize";

function OrderItem({
    title,
    category,
    price,
    size,
    qty,
    publicId,
    altText,
    width,
    height,
}) {
    const img = cld
        .image(publicId)
        .resize(fill().width(150))
        .quality("auto")
        .format("auto");

    return (
        <div className="order-item">
            <div className="order-item__inner-container">
                <figure className="order-item__fig">
                    <AdvancedImage
                        cldImg={img}
                        className="order-item__fig__img"
                        alt={altText}
                        width={width}
                        height={height}
                    />
                </figure>
                <div className="order-item__content">
                    <h3 className="order-item__content__title">{title}</h3>
                    <div className="order-item__content__category-chip-container">
                        <span className="order-item__content__category-chip">
                            {category}
                        </span>
                    </div>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--size">
                        Size
                    </h4>
                    <p className="order-item__content__desc order-item__content__size">
                        {size} gallon
                    </p>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--price">
                        Price
                    </h4>
                    <p className="order-item__content__desc order-item__content__price">
                        ${price}
                    </p>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--qty">
                        Quantity
                    </h4>
                    <p className="order-item__content__desc order-item__content__qty">
                        <span className="order-item__content__qty__x">x</span>
                        {qty}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
