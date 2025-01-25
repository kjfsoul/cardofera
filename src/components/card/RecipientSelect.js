import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Command, CommandInput, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContacts } from "../../hooks/useContacts";
import { RecipientButton } from "./recipient/RecipientButton";
import { RecipientList } from "./recipient/RecipientList";
import { toast } from "sonner";
const RecipientSelect = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [isManualEntry, setIsManualEntry] = useState(false);
    const [manualRecipient, setManualRecipient] = useState({
        name: "",
        email: "",
    });
    const { data: contacts = [], isLoading } = useContacts();
    // Convert contacts to recipients
    const recipients = contacts.map((contact) => ({
        name: contact.name,
        email: contact.email || "",
    }));
    const handleManualEntry = () => {
        if (!manualRecipient.name.trim()) {
            toast.error("Please enter a recipient name");
            return;
        }
        onChange(manualRecipient);
        setOpen(false);
        setManualRecipient({ name: "", email: "" });
        setIsManualEntry(false);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(RecipientButton, { isLoading: isLoading, selectedRecipient: value, value: value, open: open }) }), _jsx(PopoverContent, { className: "w-full p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search recipients or enter manually..." }), _jsx(CommandList, { children: _jsxs("div", { className: "p-2 border-b", children: [_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx(Button, { size: "sm", variant: !isManualEntry ? "default" : "outline", onClick: () => setIsManualEntry(false), className: "flex-1", children: "Select Contact" }), _jsx(Button, { size: "sm", variant: isManualEntry ? "default" : "outline", onClick: () => setIsManualEntry(true), className: "flex-1", children: "Manual Entry" })] }), isManualEntry ? (_jsxs("div", { className: "space-y-2", children: [_jsx(Input, { placeholder: "Enter recipient name", value: manualRecipient.name, onChange: (e) => setManualRecipient((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                })) }), _jsx(Input, { placeholder: "Enter recipient email (optional)", value: manualRecipient.email, onChange: (e) => setManualRecipient((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                })) }), _jsx(Button, { size: "sm", onClick: handleManualEntry, disabled: !manualRecipient.name.trim(), className: "w-full", children: "Use Recipient" })] })) : (_jsx(RecipientList, { isLoading: isLoading, recipients: recipients, value: value, onSelect: (recipient) => {
                                            onChange(recipient);
                                            setOpen(false);
                                        }, onOpenChange: setOpen }))] }) })] }) })] }));
};
export default RecipientSelect;
