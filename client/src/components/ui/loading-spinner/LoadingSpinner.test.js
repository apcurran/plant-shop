import { render, screen } from "../../../utils/test-utils";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner component", () => {
    test("renders with proper 'loading-spinner' class", () => {
        render(<LoadingSpinner />);

        const spinnerDiv = screen.getByTestId("loading-spinner");
        expect(spinnerDiv).toHaveClass("loading-spinner");
    });
});