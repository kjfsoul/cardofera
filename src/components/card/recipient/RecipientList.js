import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { cn } from "../../../lib/utils";
import { CommandEmpty, CommandGroup, CommandItem, } from "../../ui/command";
export const RecipientList = ({ isLoading, recipients, value, onSelect, onOpenChange }) => {
    return (_jsxs(_Fragment, { children: [_jsx(CommandEmpty, { children: isLoading ? "Loading..." : "No recipient found." }), _jsx(CommandGroup, { children: recipients.map((recipient) => (_jsxs(CommandItem, { value: recipient.name, onSelect: (currentValue) => {
                        const selected = recipients.find(r => r.name === currentValue);
                        if (selected) {
                            onSelect(selected);
                            onOpenChange(false);
                        }
                    }, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", value?.name === recipient.name ? "opacity-100" : "opacity-0") }), _jsx("span", { children: recipient.name }), recipient.email && (_jsxs("span", { className: "ml-2 text-sm text-muted-foreground", children: ["(", recipient.email, ")"] }))] }, recipient.name))) })] }));
};
