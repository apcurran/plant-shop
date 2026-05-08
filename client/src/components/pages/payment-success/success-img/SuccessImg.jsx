import { AdvancedImage } from "@cloudinary/react";

import { cld } from "@utils/cloudinary-setup";

import "./SuccessImg.css";
import { scale } from "@cloudinary/url-gen/actions/resize";

function SuccessImg() {
    const img = cld
        .image("evergreen-app/payment-success/checkout_z65rza.png")
        .resize(scale().width(1000))
        .quality("auto")
        .format("auto");

    return (
        <figure className="payment-success__fig">
            <AdvancedImage
                cldImg={img}
                className="payment-success__fig__img"
                width="1600"
                height="1200"
            />
        </figure>
    );
}

export default SuccessImg;
