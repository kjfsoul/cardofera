import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import NavigationButtons from "@/components/NavigationButtons";
const DashboardHeader = ({ userName, activeSection, onSectionChange }) => {
    return (_jsxs("header", { className: "text-center space-y-4", children: [_jsxs("h1", { className: "text-4xl font-semibold tracking-tight", children: ["Welcome, ", userName] }), _jsx("p", { className: "text-lg text-foreground/60", children: "Create something special today" }), _jsx(NavigationButtons, { activeSection: activeSection, onSectionChange: onSectionChange })] }));
};
export default DashboardHeader;
