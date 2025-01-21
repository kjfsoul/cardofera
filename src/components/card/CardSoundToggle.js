import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
const CardSoundToggle = ({ isSoundEnabled, onToggle }) => {
    return (_jsxs(Button, { variant: "outline", onClick: onToggle, className: "flex-1", children: [isSoundEnabled ? (_jsx(Volume2, { className: "mr-2 h-4 w-4" })) : (_jsx(VolumeX, { className: "mr-2 h-4 w-4" })), isSoundEnabled ? "Disable Sound" : "Enable Sound"] }));
};
export default CardSoundToggle;
