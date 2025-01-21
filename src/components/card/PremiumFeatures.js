import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PremiumFeatures = ({ isPremium }) => {
    if (isPremium)
        return null;
    return (_jsx("div", { className: "p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10", children: _jsxs("p", { className: "text-sm text-yellow-600 dark:text-yellow-400", children: ["Upgrade to Premium for advanced features:", _jsxs("ul", { className: "list-disc list-inside mt-2", children: [_jsx("li", { children: "Auto-suggested cards and gifts" }), _jsx("li", { children: "Week-in-advance birthday reminders" }), _jsx("li", { children: "Multiple delivery methods" }), _jsx("li", { children: "Aura-based theme generation" })] })] }) }));
};
export default PremiumFeatures;
