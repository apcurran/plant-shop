import { render, screen } from "../../../utils/test-utils";
import ErrorMsg from "./ErrorMsg";

describe("ErrorMsg component", () => {
    test("renders same error message passed in via 'msg' prop", () => {
        render(<ErrorMsg error="Access denied." />);

        const errMessage = screen.getByText("Access denied."); 
        expect(errMessage).toBeInTheDocument();
    });
});