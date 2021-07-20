import { Image, Transformation } from "cloudinary-react";

import "./AuthImg.css";

function AuthImg({ imgPublicId, imgWidth, imgHeight }) {
    return (
        <Image publicId={imgPublicId} className="auth-card__fig__img sign-up__card__fig__img" width={imgWidth} height={imgHeight} >
            <Transformation fetchFormat="auto" quality="auto" />
        </Image>
    );
}

export default AuthImg;
