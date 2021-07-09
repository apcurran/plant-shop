import { MemoryRouter } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import { render, screen } from "@testing-library/react";

import CollectionCard from "./CollectionCard";

describe("CollectionCard component", () => {
    test("renders CollectionCard img, badge, title, description, and shop link", () => {
        const card = {
            title: "Organic Fruit for your Home Garden",
            desc: "Nulla euismod justo sapien, cursus malesuada lorem efficitur ut. Sed nec dapibus ligula, ut luctus diam. Nunc est libero, sagittis fermentum felis vitae, fermentum volutpat neque. Vestibulum venenatis vel lorem a consequat. Praesent nec tellus metus. Aliquam consequat quis libero vitae euismod. Aliquam ac sem nec arcu facilisis imperdiet vitae et purus. Proin ut ornare nibh, in tincidunt enim.",
            linkHref: "/collections/fruit",
            imgData: {
                publicId: "evergreen-app/apple-tree_avlhwn.jpg",
                alt: "Ripe, red apple hanging on an apple tree.",
                width: "1199",
                height: "963"
            }
        };

        const { container } = render(
            <MemoryRouter>
                <CloudinaryContext cloudName="dev-project" secure="true">
                    <CollectionCard
                        key={card.title}
                        title={card.title}
                        desc={card.desc}
                        linkHref={card.linkHref}
                        imgPublicId={card.imgData.publicId}
                        imgAlt={card.imgData.alt}
                        imgWidth={card.imgData.width}
                        imgHeight={card.imgData.height}
                    />
                </CloudinaryContext>
            </MemoryRouter>
        );

        expect(container.getElementsByTagName("img"));
        expect(screen.getByText("Collection"));
        expect(screen.getByText("Organic Fruit for your Home Garden"));
        expect(screen.getByText("Nulla euismod justo sapien, cursus malesuada lorem efficitur ut. Sed nec dapibus ligula, ut luctus diam. Nunc est libero, sagittis fermentum felis vitae, fermentum volutpat neque. Vestibulum venenatis vel lorem a consequat. Praesent nec tellus metus. Aliquam consequat quis libero vitae euismod. Aliquam ac sem nec arcu facilisis imperdiet vitae et purus. Proin ut ornare nibh, in tincidunt enim."));
        expect(screen.getByText(/Shop Now/i));
    });
});