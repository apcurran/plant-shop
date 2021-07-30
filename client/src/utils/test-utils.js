import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";

function AllProviders({ children }) {
    return (
        <MemoryRouter>
            <CloudinaryContext cloudName="dev-project" secure="true">
                {children}
            </CloudinaryContext>
        </MemoryRouter>
    );
}

function customRender(ui, options) {
    render(ui, { wrapper: AllProviders, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };