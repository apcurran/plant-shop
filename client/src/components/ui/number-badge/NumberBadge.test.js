import { render, screen } from "../../../utils/test-utils";
import NumberBadge from "./NumberBadge";

describe("NumberBadge component", () => {
    test("renders the same text passed between brackets (children prop)", () => {
        render(<NumberBadge>1</NumberBadge>);

        const numberBadge = screen.getByText("1");
        expect(numberBadge).toBeInTheDocument();
    });
});