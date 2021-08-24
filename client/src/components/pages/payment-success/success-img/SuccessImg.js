import { Image, Transformation } from "cloudinary-react";

import "./SuccessImg.css";

function SuccessImg() {
    return (
        <figure className="payment-success__fig">
            <Image className="payment-success__fig__img" width="1600" height="1200" publicId="evergreen-app/payment-success/checkout_z65rza.png">
                <Transformation width="1000" quality="auto" fetchFormat="auto" />
            </Image>
        </figure>
    );
}

export default SuccessImg;
