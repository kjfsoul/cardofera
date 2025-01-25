import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import CardForm from "../CardForm";
const CardDetailsSection = ({ cardData, setCardData, isGenerating, handleGenerate, }) => {
    return (_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "1. Card Details" }), _jsx(CardForm, { cardData: cardData, setCardData: setCardData, isGenerating: isGenerating, handleGenerate: handleGenerate })] }));
};
export default CardDetailsSection;
