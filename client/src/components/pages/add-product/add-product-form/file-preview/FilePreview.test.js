import { render, screen } from "../../../../../utils/test-utils";
import FilePreview from "./FilePreview";

describe("FilePreview component", () => {
    test("renders img elem with appropriate alt text based on passed in prop vals", () => {
        render(<FilePreview selectedImgPreview="fake-test-url" selectedImgAltTxt="Fake test alt text." />);

        const imgElem = screen.getByRole("img", { name: "Fake test alt text." });
        expect(imgElem).toBeInTheDocument();
    });
});