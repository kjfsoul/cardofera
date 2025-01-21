import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CardGenerator from "@/components/CardGenerator";
import GiftQuiz from "@/components/gift/GiftQuiz";
import AuraGiftShowcase from "@/components/gift/AuraGiftShowcase";
import ProductShowcase from "@/components/gift/ProductShowcase";
import SponsoredGame from "@/components/gift/SponsoredGame";
import CalendarIntegration from "@/components/CalendarIntegration";
import ContactsList from "@/components/contacts/ContactsList";
import GiftRecipients from "@/components/GiftRecipients";
import BirthdayList from "@/components/contacts/BirthdayList";
import ProgressTracker from "@/components/ProgressTracker";
const Index = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("cards");
    const [selectedAura, setSelectedAura] = useState();
    const sections = {
        cards: _jsx(CardGenerator, {}),
        gifts: (_jsxs("div", { className: "space-y-8", children: [_jsx(GiftQuiz, {}), _jsx(AuraGiftShowcase, { selectedAura: selectedAura, onAuraSelect: (aura) => setSelectedAura(aura) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(ProductShowcase, {}), _jsx(SponsoredGame, {})] })] })),
        calendar: _jsx(CalendarIntegration, {}),
        recipients: (_jsxs("div", { className: "space-y-8", children: [_jsx(ContactsList, {}), _jsx(GiftRecipients, {})] })),
    };
    const progressItems = [
        { id: "quiz", label: "Gift Quiz", status: "completed" },
        { id: "budget", label: "Budget Filter", status: "in-progress" },
        { id: "showcase", label: "Product Showcase", status: "completed" },
        { id: "favorites", label: "Save Favorites", status: "in-progress" },
        { id: "tracking", label: "Gift Tracking", status: "pending" },
        { id: "wizard", label: "Card Wizard", status: "in-progress" },
        { id: "delivery", label: "Delivery System", status: "in-progress" },
        { id: "payments", label: "Payment Processing", status: "pending" },
        { id: "storage", label: "Cloud Storage", status: "pending" },
        { id: "api", label: "Gift API", status: "pending" },
    ];
    const handleFeatureClick = (section) => {
        if (!user) {
            navigate("/signup");
        }
        else {
            setActiveSection(section);
            const element = document.getElementById("app-content");
            element?.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate]);
    if (!user) {
        return null;
    }
    return (_jsx("div", { className: "min-h-screen p-6 bg-gradient-to-b from-background to-secondary/10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-7xl mx-auto space-y-8", children: [_jsx(DashboardHeader, { userName: user.name || user.email || "User", activeSection: activeSection, onSectionChange: setActiveSection }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-3", children: sections[activeSection] }), _jsxs("div", { className: "space-y-6", children: [_jsx(BirthdayList, {}), _jsx(ProgressTracker, { items: progressItems })] })] })] }) }));
};
export default Index;
