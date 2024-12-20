import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Gift, Calendar } from "lucide-react";
import GiftQuiz from "@/components/gift/GiftQuiz";
import ProductShowcase from "@/components/gift/ProductShowcase";
import CalendarIntegration from "@/components/CalendarIntegration";
import GiftRecipients from "@/components/GiftRecipients";
import CardGenerator from "@/components/CardGenerator";
import NavigationButtons from "@/components/NavigationButtons";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("cards");

  const sections = {
    cards: <CardGenerator />,
    gifts: (
      <div className="space-y-8">
        <GiftQuiz />
        <ProductShowcase />
      </div>
    ),
    calendar: <CalendarIntegration />,
    recipients: <GiftRecipients />,
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
      // Smooth scroll to content
      const element = document.getElementById("app-content");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Celebrate Every Moment
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-foreground/60 max-w-2xl mx-auto"
              >
                Create personalized AI-powered birthday cards and find the perfect gifts for your loved ones
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto text-lg px-8 py-6 rounded-full"
                >
                  Get Started <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/signin")}
                  className="w-full sm:w-auto text-lg px-8 py-6 rounded-full"
                >
                  Sign In
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {[
                {
                  title: "AI-Powered Cards",
                  description: "Create unique birthday cards with our AI technology",
                  icon: Sparkles,
                  section: "cards"
                },
                {
                  title: "Smart Gift Finder",
                  description: "Get personalized gift recommendations",
                  icon: Gift,
                  section: "gifts"
                },
                {
                  title: "Never Miss a Birthday",
                  description: "Sync with your calendar and get reminders",
                  icon: Calendar,
                  section: "calendar"
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 glass-card hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleFeatureClick(feature.section)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFeatureClick(feature.section);
                    }
                  }}
                >
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-lg text-foreground/60">Create something special today</p>
          <NavigationButtons 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {sections[activeSection as keyof typeof sections]}
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
