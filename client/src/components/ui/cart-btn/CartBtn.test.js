import { render, screen } from "../../../utils/test-utils";
import CartBtn from "./CartBtn";

describe("CartBtn component", () => {
    test("renders cart btn properly", () => {
        render(<CartBtn />);

        const cartBtn = screen.getByRole("link");
        expect(cartBtn).toBeInTheDocument();
    });
});