import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
const NotFound = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-4", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Page Not Found" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "The page you're looking for doesn't exist or has been moved." }), _jsxs(Button, { onClick: () => navigate("/"), className: "flex items-center gap-2", children: [_jsx(Home, { className: "h-4 w-4" }), "Return Home"] })] }));
};
export default NotFound;
