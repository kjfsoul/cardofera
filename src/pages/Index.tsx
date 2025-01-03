import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCards from "@/components/landing/FeatureCards";
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
import { AuraColor } from "@/types/gift";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("cards");
  const [selectedAura, setSelectedAura] = useState<AuraColor>();

  const sections = {
    cards: <CardGenerator />,
    gifts: (
      <div className="space-y-8">
        <GiftQuiz />
        <AuraGiftShowcase
          selectedAura={selectedAura}
          onAuraSelect={(aura) => setSelectedAura(aura)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductShowcase />
          <SponsoredGame />
        </div>
      </div>
    ),
    calendar: <CalendarIntegration />,
    recipients: (
      <div className="space-y-8">
        <ContactsList />
        <GiftRecipients />
      </div>
    ),
  };

  const progressItems = [
    { id: "quiz", label: "Gift Quiz", status: "completed" as const },
    { id: "budget", label: "Budget Filter", status: "in-progress" as const },
    { id: "showcase", label: "Product Showcase", status: "completed" as const },
    { id: "favorites", label: "Save Favorites", status: "in-progress" as const },
    { id: "tracking", label: "Gift Tracking", status: "pending" as const },
    { id: "wizard", label: "Card Wizard", status: "in-progress" as const },
    { id: "delivery", label: "Delivery System", status: "in-progress" as const },
    { id: "payments", label: "Payment Processing", status: "pending" as const },
    { id: "storage", label: "Cloud Storage", status: "pending" as const },
    { id: "api", label: "Gift API", status: "pending" as const },
  ];

  const handleFeatureClick = (section: string) => {
    if (!user) {
      navigate("/signup");
    } else {
      setActiveSection(section);
      const element = document.getElementById("app-content");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <DashboardHeader
          userName={user.name || user.email || "User"}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {sections[activeSection]}
          </div>
          
          <div className="space-y-6">
            <BirthdayList />
            <ProgressTracker items={progressItems} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;