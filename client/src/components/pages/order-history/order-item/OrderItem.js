import { Image, Transformation } from "cloudinary-react";

import "./OrderItem.css";

function OrderItem({ title, category, price, size, qty, publicId, altText, width, height }) {
    return (
        <div className="order-item">
            <div className="order-item__inner-container">
                <figure className="order-item__fig">
                    <Image className="order-item__fig__img" publicId={publicId} width={width} height={height} alt={altText}>
                        <Transformation width="150" crop="fill" quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
                <div className="order-item__content">
                    <h3 className="order-item__content__title">{title}</h3>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--size">Size</h4>
                    <p className="order-item__content__size">{size} gallon</p>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--price">Price</h4>
                    <p className="order-item__content__price">${price}</p>
                    <h4 className="order-item__content__sub-heading order-item__content__sub-heading--qty">Quantity</h4>
                    <p className="order-item__content__qty">x{qty}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
