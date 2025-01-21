import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const ProgressTracker = ({ items }) => {
    return (_jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Development Progress" }), _jsx("div", { className: "space-y-3", children: items.map((item) => (_jsxs("div", { className: "flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors", onClick: () => console.log(`Clicked: ${item.label}`), role: "button", tabIndex: 0, children: [_jsx(CheckCircle2, { className: cn("h-4 w-4", item.status === "completed"
                                ? "text-green-500"
                                : item.status === "in-progress"
                                    ? "text-yellow-500"
                                    : "text-gray-300") }), _jsx("span", { className: "text-sm", children: item.label })] }, item.id))) })] }));
};
export default ProgressTracker;
