import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles, Gift, Calendar } from "lucide-react";

interface FeatureCardsProps {
  onFeatureClick: (section: string) => void;
}

const FeatureCards = ({ onFeatureClick }: FeatureCardsProps) => {
  const features = [
    {
      title: "AI-Powered Cards",
      description: "Create unique birthday cards with our AI technology",
      icon: Sparkles,
      section: "cards",
    },
    {
      title: "Smart Gift Finder",
      description: "Get personalized gift recommendations",
      icon: Gift,
      section: "gifts",
    },
    {
      title: "Never Miss a Birthday",
      description: "Sync with your calendar and get reminders",
      icon: Calendar,
      section: "calendar",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
    >
      {features.map((feature, index) => (
        <Card
          key={index}
          className="p-6 glass-card hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onFeatureClick(feature.section)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onFeatureClick(feature.section);
            }
          }}
        >
          <feature.icon className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-foreground/60">{feature.description}</p>
        </Card>
      ))}
    </motion.div>
  );
};

export default FeatureCards;
