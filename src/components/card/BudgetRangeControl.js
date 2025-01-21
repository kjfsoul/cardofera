import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
const BudgetRangeControl = ({ value, onChange }) => {
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange(localValue);
        }, 200);
        return () => clearTimeout(timeoutId);
    }, [localValue, onChange]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Budget Range" }), _jsxs(motion.span, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "text-sm font-medium", children: ["$", localValue[0], " - $", localValue[1]] }, `${localValue[0]}-${localValue[1]}`)] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }), _jsx(Slider, { value: localValue, min: 0, max: 500, step: 10, onValueChange: (value) => setLocalValue(value), className: "flex-1" })] })] }));
};
export default BudgetRangeControl;
