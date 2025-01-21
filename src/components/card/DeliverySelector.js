import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Phone } from "lucide-react";
const DeliverySelector = ({ selectedMethod, onMethodSelect, isPremium, }) => {
    const deliveryMethods = [
        { id: "email", icon: Mail, label: "Email" },
        { id: "text", icon: MessageSquare, label: "Text", premium: true },
        { id: "print", icon: Send, label: "Mail", premium: true },
        { id: "call", icon: Phone, label: "Call", premium: true },
    ];
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Delivery Method" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: deliveryMethods.map(({ id, icon: Icon, label, premium }) => (_jsxs("button", { onClick: () => onMethodSelect(id), className: cn("p-4 rounded-lg border text-center capitalize transition-colors flex items-center justify-center gap-2", selectedMethod === id
                        ? "border-primary bg-primary/10"
                        : "border-input hover:bg-accent hover:text-accent-foreground", premium && !isPremium && "opacity-50 cursor-not-allowed"), children: [_jsx(Icon, { className: "h-4 w-4" }), label] }, id))) })] }));
};
export default DeliverySelector;
