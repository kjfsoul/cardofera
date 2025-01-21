import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Gift, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
const NavigationButtons = ({ activeSection, onSectionChange, }) => {
    const buttons = [
        { id: "cards", label: "Birthday Cards", icon: Mail },
        { id: "gifts", label: "Gift Finder", icon: Gift },
        { id: "calendar", label: "Calendar", icon: Calendar },
        { id: "recipients", label: "Recipients", icon: Plus },
    ];
    return (_jsx("div", { className: "flex flex-wrap justify-center gap-4 mt-6", children: buttons.map(({ id, label, icon: Icon }) => (_jsxs(Button, { variant: activeSection === id ? "default" : "outline", onClick: () => onSectionChange(id), className: "flex items-center gap-2", children: [_jsx(Icon, { className: "h-4 w-4" }), label] }, id))) }));
};
export default NavigationButtons;
