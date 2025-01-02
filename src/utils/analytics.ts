import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AnalyticsEvent = 
  | "card_created"
  | "card_delivered"
  | "card_opened"
  | "quiz_started"
  | "quiz_completed"
  | "gift_recommended";

export const trackEvent = async (
  eventType: AnalyticsEvent,
  cardId?: string,
  eventData?: Record<string, any>
) => {
  try {
    const { error } = await supabase.from("card_analytics").insert({
      event_type: eventType,
      card_id: cardId,
      event_data: eventData
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error tracking event:", error);
    toast.error("Failed to track analytics");
  }
};