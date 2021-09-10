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
                    
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
