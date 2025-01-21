import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "@/components/ui/progress";
const CardHeader = ({ progress }) => {
    return (_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-center mb-4", children: "Create Your Perfect Card" }), _jsx("p", { className: "text-center text-muted-foreground mb-6", children: "Design a beautiful card in minutes with our AI-powered tools" }), _jsxs("div", { className: "w-full max-w-md mx-auto mb-8", children: [_jsx(Progress, { value: progress, className: "h-2" }), _jsx("p", { className: "text-sm text-center mt-2 text-muted-foreground", children: progress === 100
                            ? "Ready to generate!"
                            : "Complete all steps to create your card" })] })] }));
};
export default CardHeader;
