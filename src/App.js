import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./components/NotFound";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // Redirect to the sign-in page if the user is not authenticated
        return _jsx(Navigate, { to: "/signin", replace: true });
    }
    return children;
};
const App = () => {
    return (_jsx(React.StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsxs(TooltipProvider, { delayDuration: 0, children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Index, {}) }) }), _jsx(Route, { path: "/404", element: _jsx(NotFound, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/404", replace: true }) })] })] }) }) }) }) }));
};
export default App;
