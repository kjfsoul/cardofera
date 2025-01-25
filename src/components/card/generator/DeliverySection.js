import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import DeliverySelector from "../DeliverySelector";
import PremiumFeatures from "../PremiumFeatures";
const DeliverySection = ({ cardData, setCardData, isPremium, }) => {
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "4. Delivery Method" }), _jsx(DeliverySelector, { selectedMethod: cardData.deliveryMethod, onMethodSelect: (method) => setCardData({ ...cardData, deliveryMethod: method }), isPremium: isPremium })] }), !isPremium && _jsx(PremiumFeatures, { isPremium: isPremium })] }));
};
export default DeliverySection;
