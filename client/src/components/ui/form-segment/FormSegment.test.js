import { render, screen } from "../../../utils/test-utils";
import FormSegment from "./FormSegment";

describe("FormSegment component", () => {
    test("renders with correct class", () => {
        render(<FormSegment>Test</FormSegment>);

        const comp = screen.getByText(/test/i);
        expect(comp).toHaveClass("form-segment");
    });
});