import { render, screen } from "../../../utils/test-utils";
import TitleBar from "./TitleBar";

describe("TitleBar component", () => {
    test("renders the same text passed between brackets (children prop)", () => {
        render(<TitleBar>My Title</TitleBar>);

        const titleBar = screen.getByRole("heading", { name: "My Title" });
        expect(titleBar).toBeInTheDocument();
    });
});