import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { cld } from "@utils/cloudinary-setup";

import "./AuthImg.css";

function AuthImg({ imgPublicId, imgWidth, imgHeight }) {
    const img = cld
        .image(imgPublicId)
        .resize(fill())
        .quality("auto")
        .format("auto");

    return (
        <AdvancedImage
            cldImg={img}
            className="auth-card__fig__img sign-up__card__fig__img"
            width={imgWidth}
            height={imgHeight}
        />
    );
}

export default AuthImg;
