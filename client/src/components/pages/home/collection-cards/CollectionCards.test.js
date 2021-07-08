import { render, screen } from "@testing-library/react";
import { CloudinaryContext } from "cloudinary-react";

import CollectionCards from "./CollectionCards";

describe("CollectionCards component", () => {
    test("renders three CollectionCard components", () => {
        const cloudinaryWrappedCollectionCards = (
            <CloudinaryContext cloudName="dev-project" secure="true">
                <CollectionCards />
            </CloudinaryContext>
        );
        render(cloudinaryWrappedCollectionCards);

        const collectionCardComp = screen.getByRole("section");

        console.log(collectionCardComp);
    });
});