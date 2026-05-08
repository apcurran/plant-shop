import { render } from "../../../../utils/test-utils";
import CollectionCards from "./CollectionCards";

describe("CollectionCards component", () => {
    test("renders all three CollectionCard components", () => {
        render(<CollectionCards />);

        const collectionCardSections = document.querySelectorAll("section");
        expect(collectionCardSections.length).toBe(3);
    });
});
