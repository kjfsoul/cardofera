import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Gift } from "lucide-react";
import QuickSendGift from "../gift/QuickSendGift";
import { useState } from "react";
const ContactItem = ({ contact, onEdit, onDelete, onQuickSend, }) => {
    const [showQuickSend, setShowQuickSend] = useState(false);
    const getDaysUntilBirthday = (birthday) => {
        if (!birthday)
            return null;
        const today = new Date();
        const nextBirthday = new Date(birthday);
        nextBirthday.setFullYear(today.getFullYear());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        return Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };
    const daysUntilBirthday = contact.birthday
        ? getDaysUntilBirthday(new Date(contact.birthday))
        : null;
    return (_jsxs("div", { className: "p-4 border rounded-lg hover:bg-accent/5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: contact.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [contact.relationship, daysUntilBirthday !== null && (_jsxs(_Fragment, { children: [" \u2022 ", daysUntilBirthday, " days until birthday"] }))] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => onEdit(contact), children: _jsx(Edit2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => {
                                    if (window.confirm("Are you sure you want to delete this contact?")) {
                                        onDelete(contact.id);
                                    }
                                }, children: _jsx(Trash2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "default", size: "icon", onClick: () => setShowQuickSend(!showQuickSend), children: _jsx(Gift, { className: "h-4 w-4" }) })] })] }), showQuickSend && (_jsx("div", { className: "mt-4", children: _jsx(QuickSendGift, { recipientName: contact.name, onSend: (auraColor) => onQuickSend(contact.id, auraColor) }) }))] }));
};
export default ContactItem;
