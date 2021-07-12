import { Image, Transformation } from "cloudinary-react";

import "./ShopHeroFig.css";

function ShopHeroFig({ img }) {
    return (
        <figure key={img.publicId} className="shop__hero__fig">
            <Image publicId={img.publicId} alt={img.alt} className="shop__hero__fig__img" width="300" height="450">
                <Transformation width="300" height="450" crop="scale" quality="auto" fetchFormat="auto" />
            </Image>
        </figure>
    );
}

export default ShopHeroFig;
