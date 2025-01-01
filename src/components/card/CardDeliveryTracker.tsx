import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

interface DeliveryRecord {
  id: string;
  recipient_email: string;
  status: string;
  scheduled_date: string | null;
  sent_date: string | null;
  created_at: string;
}

export const CardDeliveryTracker = () => {
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const { data, error } = await supabase
          .from("card_deliveries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setDeliveries(data || []);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        toast.error("Failed to load delivery history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  if (isLoading) {
    return <div>Loading delivery history...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Delivery History</h2>
      <div className="grid gap-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">To: {delivery.recipient_email}</h3>
                <p className="text-sm text-muted-foreground">
                  Status: {delivery.status}
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                {delivery.scheduled_date ? (
                  <p>Scheduled for: {format(new Date(delivery.scheduled_date), "PPP")}</p>
                ) : (
                  <p>Created: {format(new Date(delivery.created_at), "PPP")}</p>
                )}
                {delivery.sent_date && (
                  <p>Sent: {format(new Date(delivery.sent_date), "PPP")}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
        {deliveries.length === 0 && (
          <p className="text-center text-muted-foreground">No deliveries yet</p>
        )}
      </div>
    </div>
  );
};