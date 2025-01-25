import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import CardPreview3D from "./preview/CardPreview3D";
import { cn } from "@/lib/utils";
const CardPreviewSection = ({ selectedImage, imageUrl, cardMessage, isSoundEnabled, cardStyle, textPosition, fontSize, fontFamily, }) => {
    return (_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Card Preview" }), _jsx("div", { className: "relative aspect-[4/3] rounded-lg overflow-hidden border", children: _jsx(CardPreview3D, { imageUrl: selectedImage || imageUrl, text: cardMessage, enableSound: isSoundEnabled, style: cardStyle }) }), cardMessage && (_jsx("div", { className: cn("p-4 rounded-lg bg-white/50 backdrop-blur-sm", textPosition === "left" && "text-left", textPosition === "center" && "text-center", textPosition === "right" && "text-right"), style: {
                        fontSize: `${fontSize}px`,
                        fontFamily
                    }, children: cardMessage }))] }) }));
};
export default CardPreviewSection;
