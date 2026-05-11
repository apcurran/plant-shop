import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

function AllProviders({ children }) {
    return <MemoryRouter>{children}</MemoryRouter>;
}

function customRender(ui, options) {
    render(ui, { wrapper: AllProviders, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
