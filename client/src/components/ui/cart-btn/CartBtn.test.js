import { render, screen } from "../../../utils/test-utils";
import CartBtn from "./CartBtn";

describe("CartBtn component", () => {
    test("renders cart btn properly", () => {
        render(<CartBtn />);

        const cartBtn = screen.getByText("Cart", { exact: false });
        expect(cartBtn).toBeInTheDocument();
    });
});