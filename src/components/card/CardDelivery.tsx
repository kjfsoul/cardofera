import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Send, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";

interface CardDeliveryProps {
  cardRef: React.RefObject<HTMLDivElement>;
  recipientEmail: string;
  message: string;
}

export const CardDelivery = ({ cardRef, recipientEmail, message }: CardDeliveryProps) => {
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [isScheduling, setIsScheduling] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const captureCard = async () => {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current);
    return canvas.toDataURL("image/png");
  };

  const handleDownload = async () => {
    try {
      const imageData = await captureCard();
      if (!imageData) {
        toast.error("Failed to generate card image");
        return;
      }

      const link = document.createElement("a");
      link.href = imageData;
      link.download = "birthday-card.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download card");
    }
  };

  const handleSendCard = async () => {
    if (!recipientEmail) {
      toast.error("Please enter recipient's email");
      return;
    }

    setIsSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to send cards");
        return;
      }

      const imageData = await captureCard();
      if (!imageData) {
        toast.error("Failed to generate card image");
        return;
      }

      // Store delivery record
      const { data: deliveryRecord, error: deliveryError } = await supabase
        .from("card_deliveries")
        .insert({
          recipient_email: recipientEmail,
          card_image: imageData,
          message,
          scheduled_date: scheduledDate,
          user_id: user.id,
          status: scheduledDate ? "scheduled" : "pending",
        })
        .select()
        .single();

      if (deliveryError) throw deliveryError;

      // Send email if not scheduled
      if (!scheduledDate) {
        const { error: emailError } = await supabase.functions.invoke("send-email", {
          body: {
            to: recipientEmail,
            subject: "You received a birthday card!",
            html: `<div style="font-family: sans-serif;">
              <h1>Someone sent you a birthday card!</h1>
              <p>${message}</p>
            </div>`,
            cardImage: imageData,
          },
        });

        if (emailError) throw emailError;
      }

      toast.success(
        scheduledDate
          ? "Card scheduled for delivery!"
          : "Card sent successfully!"
      );
      setScheduledDate(undefined);
    } catch (error) {
      console.error("Send error:", error);
      toast.error("Failed to send card. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="recipientEmail">Recipient's Email</Label>
        <Input
          id="recipientEmail"
          type="email"
          value={recipientEmail}
          disabled
          className="bg-muted"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Popover open={isScheduling} onOpenChange={setIsScheduling}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {scheduledDate ? format(scheduledDate, "PPP") : "Schedule delivery"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={scheduledDate}
              onSelect={(date) => {
                setScheduledDate(date);
                setIsScheduling(false);
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex space-x-2">
        <Button
          className="flex-1"
          onClick={handleSendCard}
          disabled={isSending}
        >
          <Send className="mr-2 h-4 w-4" />
          {isSending ? "Sending..." : scheduledDate ? "Schedule" : "Send Now"}
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={isSending}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};