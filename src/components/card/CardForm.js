import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Wand2, RotateCcw } from "lucide-react";
import RecipientSelect from "./RecipientSelect";
const CardForm = ({ cardData, setCardData, isGenerating, handleGenerate, }) => {
    const occasions = [
        "birthday",
        "anniversary",
        "congratulations",
        "thank-you",
        "christmas",
        "new-year",
        "valentine's-day",
        "mother's-day",
        "father's-day",
        "graduation",
        "wedding",
        "baby-shower",
        "halloween",
        "easter",
        "thanksgiving",
    ];
    const handleReset = () => {
        setCardData({
            recipientName: { name: "", email: "" },
            occasion: "birthday",
            message: "",
            style: "modern",
            deliveryMethod: "email",
        });
    };
    const handleAutoSuggest = () => {
        const suggestedMessage = `Dear ${cardData.recipientName.name},\nWishing you a wonderful ${cardData.occasion}!`;
        setCardData({ ...cardData, message: suggestedMessage });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { htmlFor: "recipientName", children: "Recipient's Name" }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: handleReset, className: "text-muted-foreground", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Reset All"] })] }), _jsx(RecipientSelect, { value: cardData.recipientName, onChange: (value) => setCardData({ ...cardData, recipientName: value }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "occasion", children: "Occasion" }), _jsx("select", { id: "occasion", value: cardData.occasion, onChange: (e) => setCardData({ ...cardData, occasion: e.target.value }), className: "w-full rounded-md border border-input bg-background px-3 py-2", children: occasions.map((occasion) => (_jsx("option", { value: occasion, children: occasion.charAt(0).toUpperCase() +
                                occasion.slice(1).replace("-", " ") }, occasion))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { htmlFor: "message", children: "Message" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleAutoSuggest, disabled: isGenerating, className: "text-primary", children: [_jsx(Wand2, { className: "h-4 w-4 mr-2" }), "Auto-Suggest"] })] }), _jsx(Textarea, { id: "message", value: cardData.message, onChange: (e) => setCardData({ ...cardData, message: e.target.value }), placeholder: "Enter your message or click Auto-Suggest", className: "min-h-[100px]" })] })] }));
};
export default CardForm;
