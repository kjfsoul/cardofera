import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "text-center space-y-6", children: [_jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent", children: "Celebrate Every Moment" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "text-xl text-foreground/60 max-w-2xl mx-auto", children: "Create personalized AI-powered birthday cards and find the perfect gifts for your loved ones" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4 }, className: "flex flex-col sm:flex-row gap-4 justify-center items-center mt-8", children: [_jsxs(Button, { size: "lg", onClick: () => navigate("/signup"), className: "w-full sm:w-auto text-lg px-8 py-6 rounded-full", children: ["Get Started ", _jsx(Sparkles, { className: "ml-2 h-5 w-5" })] }), _jsx(Button, { size: "lg", variant: "outline", onClick: () => navigate("/signin"), className: "w-full sm:w-auto text-lg px-8 py-6 rounded-full", children: "Sign In" })] })] }));
};
export default HeroSection;
