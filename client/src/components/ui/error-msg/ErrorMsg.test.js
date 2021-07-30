import { render, screen } from "../../../utils/test-utils";
import ErrorMsg from "./ErrorMsg";

describe("ErrorMsg component", () => {
    test("renders error message properly", () => {
        render(<ErrorMsg msg={"Access denied."} />);

        const errMessage = screen.getByText("Access denied."); 
        expect(errMessage).toBeInTheDocument();
    });
});