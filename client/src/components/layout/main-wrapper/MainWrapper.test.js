import { screen, render } from "../../../utils/test-utils";
import MainWrapper from "./MainWrapper";

describe("MainWrapper component", () => {
    test("renders component with 'main-page-wrapper' class", () => {
        render(<MainWrapper>Test</MainWrapper>);
    
        const mainElem = screen.getByRole("main");
        expect(mainElem).toHaveClass("main-page-wrapper");
    });

    test("renders component with children prop output between tags properly", () => {
        render(<MainWrapper>Test phrase</MainWrapper>);

        const mainElem = screen.getByText(/test phrase/i);
        expect(mainElem).toBeInTheDocument();
    });
});