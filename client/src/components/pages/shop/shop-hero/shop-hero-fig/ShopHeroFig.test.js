import { CloudinaryContext } from "cloudinary-react";
import { render, screen } from "@testing-library/react";

import ShopHeroFig from "./ShopHeroFig";

const imgData = {
    publicId: "evergreen-app/collections/hero/long-leaves-bg_focsfr.jpg",
    alt: "Plant with long green leaves."
};

function MockShopHeroFig({ img }) {
    // Mock the component to allow the use of Cloudinary's image CDN.

    return (
        <CloudinaryContext cloudName="dev-project" secure="true">
            <ShopHeroFig img={img} />
        </CloudinaryContext>
    );
}

describe("ShopHeroFig component", () => {
    test("renders hero img", () => {
        render(<MockShopHeroFig img={imgData} />);

        const img = screen.getByRole("img");

        expect(img).toBeInTheDocument();
    });

    test("hero img contains appropriate alt text", () => {
        render(<MockShopHeroFig img={imgData} />);

        const img = screen.getByRole("img", { name: "Plant with long green leaves." });

        expect(img).toBeInTheDocument();
    });
});
