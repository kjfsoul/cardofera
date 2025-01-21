import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
const DiscountModal = ({ open, onOpenChange, code, expiresAt, percentage }) => {
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = expiresAt.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft("Expired");
                return;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${hours}h ${minutes}m`);
        }, 1000);
        return () => clearInterval(timer);
    }, [expiresAt]);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Discount code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Your Discount Code" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(motion.div, { className: "p-6 bg-primary/10 rounded-lg text-center", initial: { scale: 0.95 }, animate: { scale: 1 }, children: [_jsx("div", { className: "text-3xl font-bold font-mono tracking-wider", children: code }), _jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [percentage, "% off your order"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Expires in: ", timeLeft] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: handleCopy, className: "flex items-center gap-2", children: [copied ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(Copy, { className: "h-4 w-4" })), copied ? "Copied!" : "Copy Code"] })] })] })] }) }));
};
export default DiscountModal;
