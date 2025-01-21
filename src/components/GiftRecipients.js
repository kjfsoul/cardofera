import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gift, Plus, Tag } from "lucide-react";
import { toast } from "sonner";
const GiftRecipients = () => {
    const [recipients, setRecipients] = useState([]);
    const [newRecipient, setNewRecipient] = useState({
        name: "",
        relationship: "",
        preferences: "",
    });
    const handleAddRecipient = () => {
        if (!newRecipient.name || !newRecipient.relationship) {
            toast.error("Please fill in all required fields");
            return;
        }
        const recipient = {
            id: Date.now().toString(),
            ...newRecipient,
        };
        setRecipients([...recipients, recipient]);
        setNewRecipient({ name: "", relationship: "", preferences: "" });
        toast.success("Recipient added successfully!");
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Gift, { className: "h-5 w-5" }), "Gift Recipients"] }), _jsx(CardDescription, { children: "Manage your gift recipients and their preferences" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", value: newRecipient.name, onChange: (e) => setNewRecipient({ ...newRecipient, name: e.target.value }), placeholder: "Enter recipient name" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "relationship", children: "Relationship" }), _jsx(Input, { id: "relationship", value: newRecipient.relationship, onChange: (e) => setNewRecipient({ ...newRecipient, relationship: e.target.value }), placeholder: "e.g., Friend, Family, Colleague" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "preferences", children: "Gift Preferences" }), _jsx(Input, { id: "preferences", value: newRecipient.preferences, onChange: (e) => setNewRecipient({ ...newRecipient, preferences: e.target.value }), placeholder: "Enter gift preferences" })] })] }), _jsxs(Button, { onClick: handleAddRecipient, className: "w-full", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Recipient"] })] }), _jsx("div", { className: "space-y-4", children: recipients.map((recipient) => (_jsxs("div", { className: "flex flex-col gap-2 p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium", children: recipient.name }), _jsxs("span", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(Tag, { className: "h-4 w-4 mr-1" }), recipient.relationship] })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Preferences: ", recipient.preferences || "None specified"] })] }, recipient.id))) })] })] }));
};
export default GiftRecipients;
