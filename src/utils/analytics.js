import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export const trackEvent = async (eventType, cardId, eventData) => {
    try {
        const { error } = await supabase.from("card_analytics").insert({
            event_type: eventType,
            card_id: cardId,
            event_data: eventData
        });
        if (error)
            throw error;
    }
    catch (error) {
        console.error("Error tracking event:", error);
        toast.error("Failed to track analytics");
    }
};
