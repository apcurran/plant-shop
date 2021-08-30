import { Image, Transformation } from "cloudinary-react";

import "./ShippingContent.css";

function ShippingContent() {
    return (
        <div className="shipping-grid__content">
            <h2 className="shipping-grid__content__title">Shipping Info</h2>
            <p className="shipping-grid__content__desc">Enter cardholder's name and address information.</p>
            <figure className="shipping-grid__content__fig">
                <Image className="shipping-grid__content__fig__img" publicId="evergreen-app/shipping-details/shipping_yor51n.png" width="1600" height="1200">
                    <Transformation width="600" crop="fill" quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
        </div>
    );
}

export default ShippingContent;
