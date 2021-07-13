import { CloudinaryContext } from "cloudinary-react";
import { render, screen } from "@testing-library/react";

import ShopHero from "./ShopHero";

function MockShopHero({ categoryQueryText }) {
    // Mock the component to allow the use of Cloudinary's image CDN.

    return (
        <CloudinaryContext cloudName="dev-project" secure="true">
            <ShopHero categoryQueryText={categoryQueryText} />
        </CloudinaryContext>
    );
}

describe("ShopHero component", () => {
    test("renders four figure elements (ShopHeroFig components) in the ShopHero component when the query text is 'all'", () => {
        render(<MockShopHero categoryQueryText="all" />);

        const figureElems = screen.getAllByRole("figure");
        
        expect(figureElems.length).toBe(4);
    });

    test("renders four figure elements (ShopHeroFig components) in the ShopHero component when the query text is 'house plants'", () => {
        render(<MockShopHero categoryQueryText="house plants" />);

        const figureElems = screen.getAllByRole("figure");
        
        expect(figureElems.length).toBe(4);
    });

    test("renders four figure elements (ShopHeroFig components) in the ShopHero component when the query text is 'fruit trees'", () => {
        render(<MockShopHero categoryQueryText="fruit trees" />);

        const figureElems = screen.getAllByRole("figure");
        
        expect(figureElems.length).toBe(4);
    });

    test("renders four figure elements (ShopHeroFig components) in the ShopHero component when the query text is 'shade trees'", () => {
        render(<MockShopHero categoryQueryText="shade trees" />);

        const figureElems = screen.getAllByRole("figure");
        
        expect(figureElems.length).toBe(4);
    });
});