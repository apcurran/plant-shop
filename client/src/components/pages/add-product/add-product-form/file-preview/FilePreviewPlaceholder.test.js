import { render, screen } from "../../../../../utils/test-utils";
import FilePreviewPlaceholder from "./FilePreviewPlaceholder";

describe("FilePreviewPlaceholder component", () => {
    test("renders svg child element", () => {
        render(<FilePreviewPlaceholder />);

        const svgElem = document.querySelector("svg");
        expect(svgElem).toBeInTheDocument();
    });

    test("renders h3 child element", () => {
        render(<FilePreviewPlaceholder />);

        const heading = screen.getByRole("heading", { name: "Image Preview" });
        expect(heading).toBeInTheDocument();
    });
});