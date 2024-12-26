import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, DollarSign, Tag, Percent } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Contact {
  id: string;
  name: string;
  relationship: string;
  preferred_categories: string[];
}

const GiftQuiz = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [budget, setBudget] = useState([50, 200]);
  const [interests, setInterests] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*');
      if (error) throw error;
      return data as Contact[];
    }
  });

  useEffect(() => {
    if (selectedContact) {
      setInterests(selectedContact.preferred_categories || []);
      calculateMatchScore();
    }
  }, [selectedContact]);

  const calculateMatchScore = () => {
    if (!selectedContact) return;
    
    // Simple scoring based on filled information
    let score = 0;
    if (selectedContact) score += 30;
    if (interests.length > 0) score += 40;
    if (budget[0] !== budget[1]) score += 30;
    
    setMatchScore(score);
  };

  const handleSubmit = async () => {
    if (!selectedContact) {
      toast.error("Please select a recipient");
      return;
    }

    toast.success("Generating personalized recommendations...");
    // This will be connected to the recommendation engine
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Gift Recommendation Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Select Recipient</Label>
          <div className="grid grid-cols-2 gap-4">
            {contacts?.map((contact) => (
              <Button
                key={contact.id}
                variant={selectedContact?.id === contact.id ? "default" : "outline"}
                onClick={() => setSelectedContact(contact)}
                className="justify-start"
              >
                <User className="mr-2 h-4 w-4" />
                {contact.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Budget Range</Label>
            <span className="text-sm text-muted-foreground">
              ${budget[0]} - ${budget[1]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <DollarSign className="h-4 w-4" />
            <Slider
              value={budget}
              min={0}
              max={500}
              step={10}
              onValueChange={setBudget}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Interests</Label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                <Tag className="mr-2 h-3 w-3" />
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-4 bg-primary/5 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            <span className="font-medium">Match Score</span>
          </div>
          <span className="text-2xl font-bold text-primary">{matchScore}%</span>
        </motion.div>

        <Button onClick={handleSubmit} className="w-full">
          Get Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default GiftQuiz;