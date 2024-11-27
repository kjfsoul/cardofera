import { useState } from "react";
import { Calendar, Gift, Mail, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CalendarIntegration from "@/components/CalendarIntegration";
import GiftRecipients from "@/components/GiftRecipients";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingBirthdays] = useState([
    { name: "Sarah Parker", date: "April 15", days: 3 },
    { name: "Michael Chen", date: "April 20", days: 8 },
    { name: "Emma Wilson", date: "April 25", days: 13 },
  ]);

  if (!user) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-background to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-8 text-center"
        >
          <header className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">Birthday Buddy</h1>
            <p className="text-lg text-foreground/60">Never miss a special day</p>
          </header>
          <div className="space-y-4">
            <Button onClick={() => navigate("/signin")} size="lg" className="mx-2">
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")} size="lg" variant="outline" className="mx-2">
              Sign Up
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">Welcome, {user.name}</h1>
          <p className="text-lg text-foreground/60">Never miss a special day</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalendarIntegration />
          <GiftRecipients />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Upcoming</h2>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {upcomingBirthdays.map((birthday) => (
                <div
                  key={birthday.name}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-md"
                >
                  <div>
                    <p className="font-medium">{birthday.name}</p>
                    <p className="text-sm text-foreground/60">{birthday.date}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {birthday.days} days
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Cards</h2>
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center">
              <button className="flex items-center gap-2 px-4 py-2 bg-background/90 rounded-full hover:bg-background transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Card</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Gifts</h2>
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-background/50 rounded-md">
                <p className="font-medium">Gift Ideas</p>
                <p className="text-sm text-foreground/60">Track and manage gift ideas</p>
              </div>
              <div className="p-3 bg-background/50 rounded-md">
                <p className="font-medium">Shopping List</p>
                <p className="text-sm text-foreground/60">Organize your gift shopping</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass-card p-8 rounded-lg text-center space-y-4"
        >
          <h2 className="text-2xl font-medium">Import Contacts</h2>
          <p className="text-foreground/60 max-w-md mx-auto">
            Sync with your contacts to automatically track birthdays and never miss a celebration
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
            Connect Contacts
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
