import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { User, Plus } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";
const RecipientQuickSelect = ({ value, onChange, onAddNew, }) => {
    const { data: contacts = [], isLoading } = useContacts();
    const [recentRecipients, setRecentRecipients] = useState([]);
    useEffect(() => {
        const stored = localStorage.getItem("recentRecipients");
        if (stored) {
            setRecentRecipients(JSON.parse(stored));
        }
    }, []);
    const handleSelect = (name) => {
        onChange(name);
        const updated = [name, ...recentRecipients.filter((r) => r !== name)].slice(0, 5);
        setRecentRecipients(updated);
        localStorage.setItem("recentRecipients", JSON.stringify(updated));
    };
    if (isLoading) {
        return _jsx("div", { className: "text-center py-4", children: "Loading contacts..." });
    }
    return (_jsxs("div", { className: "space-y-4", children: [recentRecipients.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: recentRecipients.map((name) => (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleSelect(name), className: value === name ? "bg-primary/10" : "", children: [_jsx(User, { className: "h-4 w-4 mr-2" }), name] }, name))) })), _jsxs(Command, { className: "rounded-lg border shadow-md", children: [_jsx(CommandInput, { placeholder: "Search recipients..." }), _jsxs(CommandList, { children: [_jsxs(CommandEmpty, { children: ["No recipients found.", _jsxs(Button, { variant: "ghost", size: "sm", onClick: onAddNew, className: "mt-2 w-full", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add New Contact"] })] }), _jsx(CommandGroup, { children: contacts.map((contact) => (_jsxs(CommandItem, { value: contact.name, onSelect: () => handleSelect(contact.name), children: [_jsx(User, { className: "h-4 w-4 mr-2" }), contact.name, contact.relationship && (_jsxs("span", { className: "ml-2 text-sm text-muted-foreground", children: ["(", contact.relationship, ")"] }))] }, contact.id))) })] })] })] }));
};
export default RecipientQuickSelect;
