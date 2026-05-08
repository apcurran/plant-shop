import { AdvancedImage } from "@cloudinary/react";

import { cld } from "@utils/cloudinary-setup";

import "./ShippingContent.css";
import { fill } from "@cloudinary/url-gen/actions/resize";

function ShippingContent() {
    const img = cld
        .image("evergreen-app/shipping-details/shipping_yor51n.png")
        .resize(fill().width(600))
        .quality("auto")
        .format("auto");

    return (
        <div className="shipping-grid__content">
            <h2 className="shipping-grid__content__title">Shipping Info</h2>
            <p className="shipping-grid__content__desc">
                Enter cardholder's name and address information.
            </p>
            <figure className="shipping-grid__content__fig">
                <AdvancedImage
                    cldImg={img}
                    className="shipping-grid__content__fig__img"
                    width="1600"
                    height="1200"
                />
            </figure>
        </div>
    );
}

export default ShippingContent;
