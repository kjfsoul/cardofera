import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Wand2, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

const CardGenerator = () => {
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);

  const templates = [
    { id: "1", name: "Birthday Celebration", preview: "/placeholder.svg" },
    { id: "2", name: "Festive Wishes", preview: "/placeholder.svg" },
    { id: "3", name: "Joyful Moments", preview: "/placeholder.svg" },
  ];

  const handleGenerateCard = async () => {
    try {
      // Mock AI generation - replace with actual AI integration
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: "Generating your card...",
          success: "Card generated successfully!",
          error: "Failed to generate card",
        }
      );
      setGeneratedCard("/placeholder.svg");
    } catch (error) {
      toast.error("Failed to generate card");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Create Your Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Recipient's name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={cn(
                  "relative w-24 h-24 rounded-lg cursor-pointer overflow-hidden border-2 transition-all",
                  selectedTemplate === template.id
                    ? "border-primary scale-105"
                    : "border-transparent hover:border-primary/50"
                )}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleGenerateCard}>
              <Wand2 className="mr-2 h-4 w-4" /> Generate with AI
            </Button>
            <Button variant="outline" className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <ImagePlus className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {generatedCard ? (
            <>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={generatedCard}
                  alt="Generated card"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </>
          ) : (
            <div className="aspect-[4/3] rounded-lg bg-accent/20 flex items-center justify-center">
              <p className="text-foreground/60">
                Your card preview will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CardGenerator;