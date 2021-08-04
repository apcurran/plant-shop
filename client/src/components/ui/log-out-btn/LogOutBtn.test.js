import { render, screen } from "../../../utils/test-utils";
import LogOutBtn from "./LogOutBtn";

describe("LogOutBtn component", () => {
    test("renders log out btn properly", () => {
        const mockedHandleLogOutFunc = jest.fn();
        render(<LogOutBtn handleLogOut={mockedHandleLogOutFunc} />);

        const logOutBtn = screen.getByRole("button", { name: /Log Out/i });
        expect(logOutBtn).toBeInTheDocument();
    });

    test("log out btn has proper class for styling", () => {
        const mockedHandleLogOutFunc = jest.fn();
        render(<LogOutBtn handleLogOut={mockedHandleLogOutFunc} />);

        const logOutBtn = screen.getByRole("button", { name: /Log Out/i });
        expect(logOutBtn).toHaveClass("log-out-btn");
    });
});