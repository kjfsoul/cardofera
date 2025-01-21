import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ImagePlus, Upload } from "lucide-react";
import CardSoundToggle from "./CardSoundToggle";
const CardActions = ({ showImageSearch, setShowImageSearch, isSoundEnabled, setIsSoundEnabled, handleImageUpload, setShowSponsoredGame, showSponsoredGame, }) => {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs(Button, { variant: "outline", onClick: () => setShowImageSearch(!showImageSearch), className: "flex-1", children: [_jsx(ImagePlus, { className: "mr-2 h-4 w-4" }), showImageSearch ? "Hide Image Search" : "Search Images"] }), _jsx(CardSoundToggle, { isSoundEnabled: isSoundEnabled, onToggle: () => setIsSoundEnabled(!isSoundEnabled) })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { variant: "outline", className: "flex-1", asChild: true, children: _jsxs("label", { children: [_jsx(Upload, { className: "mr-2 h-4 w-4" }), "Upload Image", _jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleImageUpload })] }) }), _jsx(Button, { variant: "outline", onClick: () => setShowSponsoredGame(!showSponsoredGame), className: "flex-1", children: "Play & Win" })] })] }));
};
export default CardActions;
