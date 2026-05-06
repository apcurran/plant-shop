import { render, screen } from "../../../utils/test-utils";
import Message from "./Message";

describe("Message component", () => {
    test("renders component with correct class", () => {
        const msg = "Test message here";
        render(<Message msg={msg} />);

        const messageComp = screen.getByText(msg);
        expect(messageComp).toHaveClass("message");
    });

    test("renders component with correct msg prop output", () => {
        const msg = "Test message here";
        render(<Message msg={msg} />);

        const messageComp = screen.getByText(msg);
        expect(messageComp).toBeInTheDocument();
    });
});
