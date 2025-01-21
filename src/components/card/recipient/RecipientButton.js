import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../components/ui/button";
import { ChevronsUpDown } from "lucide-react";
export const RecipientButton = ({ isLoading, selectedRecipient, value, open, }) => {
    return (_jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-full justify-between", disabled: isLoading, children: [isLoading
                ? "Loading contacts..."
                : selectedRecipient?.name
                    ? selectedRecipient.name
                    : value?.name || "Select recipient...", _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }));
};
