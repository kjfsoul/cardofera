import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { toast } from "sonner";
const SponsoredGame = ({ onWin }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => {
        setIsPlaying(true);
        // Simulate game play and winning
        setTimeout(() => {
            const discount = Math.floor(Math.random() * 30) + 10; // Random discount between 10-40%
            toast.success(`Congratulations! You won a ${discount}% discount!`);
            onWin();
            setIsPlaying(false);
        }, 2000);
    };
    return (_jsxs("div", { className: "p-4 rounded-lg border border-primary/20 bg-primary/5", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Win Premium Features!" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Play a quick game to win discounts on premium features." }), _jsxs(Button, { variant: "outline", onClick: handlePlay, disabled: isPlaying, className: "w-full", children: [_jsx(Gift, { className: "mr-2 h-4 w-4" }), isPlaying ? "Playing..." : "Play Now"] })] }));
};
export default SponsoredGame;
