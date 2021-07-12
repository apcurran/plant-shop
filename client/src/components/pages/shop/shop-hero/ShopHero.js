import { Image, Transformation } from "cloudinary-react";

import "./ShopHero.css";

function ShopHero({ categoryQueryText }) {
    // Output different images and headline boxes for each collection type
    const housePlantImgs = [
        {
            publicId: "evergreen-app/collections/hero/long-leaves-bg_focsfr.jpg",
            alt: "Plant with long green leaves."
        },
        {
            publicId: "evergreen-app/collections/hero/purple-leaves-bg_kz8iqm.jpg",
            alt: "Bird's eye view of purple leaves."
        },
        {
            publicId: "evergreen-app/collections/hero/green-leaves-bg_owspbi.jpg",
            alt: "Bird's eye view of green leaves with ridges on them."
        },
        {
            publicId: "evergreen-app/collections/hero/cactus-leaves-bg_dqjlmp.jpg",
            alt: "Bird's eye view of flower-shaped purple cactus leaves."
        }
    ];

    let outputImgs;

    if (categoryQueryText === "house plants") {
        outputImgs = housePlantImgs.map((img) => {
            return (
                <figure key={img.publicId} className="shop__hero__fig">
                    <Image publicId={img.publicId} alt={img.alt} className="shop__hero__fig__img" width="300" height="450">
                        <Transformation width="300" height="450" crop="fit" quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
            );
        })
    }

    return (
        <div>
            {outputImgs}
        </div>
    );
}

export default ShopHero;
