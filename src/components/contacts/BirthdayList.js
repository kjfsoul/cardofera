import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
const mockContacts = [
    {
        id: "1",
        name: "Sarah Johnson",
        birthday: "2024-04-15",
        relationship: "Sister",
        auraColor: "blue", // Spa & Wellness
    },
    {
        id: "2",
        name: "Mike Smith",
        birthday: "2024-04-20",
        relationship: "Friend",
        avatar: "/placeholder.svg",
        auraColor: "purple", // Gaming & Tech
    },
    {
        id: "3",
        name: "Emma Davis",
        birthday: "2024-05-01",
        relationship: "Colleague",
        auraColor: "pink", // Beauty & Fashion
    },
];
const auraCategories = {
    blue: "Spa & Wellness Packages",
    purple: "Gaming & Tech Gadgets",
    pink: "Beauty & Fashion Items",
    green: "Outdoor & Adventure Gear",
    yellow: "Restaurant & Entertainment",
    orange: "Creative & Artistic Supplies",
};
const BirthdayList = () => {
    const handleQuickSend = (contact) => {
        toast.success(`Generating surprise ${auraCategories[contact.auraColor]} for ${contact.name}!`);
    };
    const getDaysUntilBirthday = (birthday) => {
        const today = new Date();
        const birthdayDate = new Date(birthday);
        const diffTime = birthdayDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), "Upcoming Birthdays"] }) }), _jsx(CardContent, { className: "space-y-4", children: mockContacts
                    .sort((a, b) => getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday))
                    .map((contact) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: contact.avatar }), _jsx(AvatarFallback, { children: contact.name.split(" ").map((n) => n[0]).join("") })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: contact.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [contact.relationship, " \u2022 ", getDaysUntilBirthday(contact.birthday), " days away"] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("div", { className: `w-3 h-3 rounded-full bg-${contact.auraColor}-500`, title: auraCategories[contact.auraColor] }), _jsx("span", { className: "text-xs text-muted-foreground", children: auraCategories[contact.auraColor] })] })] })] }), _jsx("div", { className: "flex gap-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleQuickSend(contact), className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4" }), "Quick Send"] }) })] }, contact.id))) })] }));
};
export default BirthdayList;
