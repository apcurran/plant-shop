import { render, screen } from "../../../../utils/test-utils";
import ProductSizeBtn from "./ProductSizeBtn";

describe("ProductSizeBtn component", () => {
    test("outputs props properly within component", () => {
        render(<ProductSizeBtn prodSizeGallons={1} prodSizePrice={"15.00"} />);

        const parentBtn = screen.getByRole("button");
        const sizeDiv = screen.getByText(/1 gallon/i);
        const priceSpan = screen.getByText((content, elem) => {
            return elem.tagName.toLowerCase() === "span" && content.startsWith("$");
        });
        
        expect(parentBtn).toBeInTheDocument();
        expect(sizeDiv).toHaveTextContent("1 gallon");
        expect(priceSpan).toHaveTextContent("$15.00");
    });
});