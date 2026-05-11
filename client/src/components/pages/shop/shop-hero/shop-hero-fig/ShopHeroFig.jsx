import { AdvancedImage } from "@cloudinary/react";

import { cld } from "@utils/cloudinary-setup";

import "./ShopHeroFig.css";
import { scale } from "@cloudinary/url-gen/actions/resize";

function ShopHeroFig({ img }) {
    const cldImg = cld
        .image(img.publicId)
        .resize(scale().width(300).height(450))
        .quality("auto")
        .format("auto");

    return (
        <figure className="shop__hero__fig">
            <AdvancedImage
                cldImg={cldImg}
                alt={img.alt}
                className="shop__hero__fig__img"
                width="300"
                height="450"
            />
        </figure>
    );
}

export default ShopHeroFig;
