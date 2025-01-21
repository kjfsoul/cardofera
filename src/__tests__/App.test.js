import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { AuthProvider } from "../contexts/AuthContext";
// Create query client instance
const queryClient = new QueryClient();
// Test wrapper component with proper typing
const TestWrapper = ({ initialEntries, }) => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(MemoryRouter, { initialEntries: initialEntries, children: _jsx(App, {}) }) }) }));
};
// Render helper function with explicit return type
const renderWithProviders = (initialEntries = ["/"]) => {
    return render(_jsx(TestWrapper, { initialEntries: initialEntries }));
};
describe("App Routing", () => {
    test("redirects unauthenticated users to sign-in", async () => {
        renderWithProviders(["/protected-route"]);
        expect(await screen.findByText(/sign in/i)).toBeInTheDocument();
    });
    test("renders sign-in page at /signin", () => {
        renderWithProviders(["/signin"]);
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });
    test("renders 404 page for unknown routes", () => {
        renderWithProviders(["/unknown-route"]);
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
});
