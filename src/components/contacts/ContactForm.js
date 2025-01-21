import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
const ContactForm = ({ contact, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: contact?.name || "",
        relationship: contact?.relationship || "",
        birthday: contact?.birthday ? format(new Date(contact.birthday), "yyyy-MM-dd") : "",
        preferred_categories: contact?.preferred_categories || []
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit({
            name: formData.name,
            relationship: formData.relationship,
            birthday: formData.birthday ? new Date(formData.birthday) : null,
            preferred_categories: formData.preferred_categories
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), placeholder: "Contact name" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "relationship", children: "Relationship" }), _jsx(Input, { id: "relationship", value: formData.relationship, onChange: (e) => setFormData(prev => ({ ...prev, relationship: e.target.value })), placeholder: "e.g. Friend, Family" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "birthday", children: "Birthday" }), _jsx(Input, { id: "birthday", type: "date", value: formData.birthday, onChange: (e) => setFormData(prev => ({ ...prev, birthday: e.target.value })) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { type: "submit", className: "flex-1", children: [contact?.id ? "Update" : "Add", " Contact"] }), _jsx(Button, { type: "button", variant: "outline", onClick: onCancel, children: "Cancel" })] })] }));
};
export default ContactForm;
