import { render, screen } from "../../../utils/test-utils";
import AdminUpdateProductLink from "./AdminUpdateProductLink";

describe("AdminUpdateProductLink component", () => {
    test("rendered link should have href matching passed in prop value", () => {
        const productId = 1;
        render(<AdminUpdateProductLink productId={productId} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/admin/collections/update-product/${productId}`);
    });
});