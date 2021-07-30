// import { MemoryRouter } from "react-router-dom";
// import { CloudinaryContext } from "cloudinary-react";
// import { render } from "@testing-library/react";

// import CollectionCards from "./CollectionCards";

// describe("CollectionCards component", () => {
//     test("renders three CollectionCard components", () => {
//         const { container } = render(
//             <MemoryRouter>
//                 <CloudinaryContext cloudName="dev-project" secure="true">
//                     <CollectionCards />
//                 </CloudinaryContext>
//             </MemoryRouter>
//         );

//         expect(container.getElementsByTagName("section").length).toBe(3);
//     });
// });

import { render } from "../../../../utils/test-utils";
import CollectionCards from "./CollectionCards";

describe("CollectionCards component", () => {
    test("renders all three CollectionCard components", () => {
        render(
            <CollectionCards />
        );

        const collectionCardSections = document.querySelectorAll("section");
        expect(collectionCardSections.length).toBe(3);
    });
});