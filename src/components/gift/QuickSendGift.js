import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import AuraColorSelector from "./AuraColorSelector";
const QuickSendGift = ({ recipientName, onSend }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const handleQuickSend = async () => {
        if (!selectedColor) {
            toast.error("Please select an aura color first");
            return;
        }
        setIsSending(true);
        try {
            await onSend(selectedColor);
            toast.success(_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Sparkles, { className: "h-6 w-6 text-yellow-400" }), _jsxs("span", { children: ["Gift sent successfully to ", recipientName, "!"] })] }));
        }
        catch (error) {
            toast.error("Failed to send gift. Please try again.");
        }
        finally {
            setIsSending(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(AuraColorSelector, { selectedColor: selectedColor, onColorSelect: setSelectedColor }), selectedColor && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-4 rounded-lg border", children: _jsxs(Button, { onClick: handleQuickSend, disabled: isSending, className: "w-full", children: [_jsx(Gift, { className: "mr-2 h-4 w-4" }), isSending ? "Sending..." : "Quick Send Gift"] }) }))] }));
};
export default QuickSendGift;
