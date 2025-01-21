import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
export const CardDeliveryTracker = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const { data, error } = await supabase
                    .from("card_deliveries")
                    .select("*")
                    .order("created_at", { ascending: false });
                if (error)
                    throw error;
                setDeliveries(data || []);
            }
            catch (error) {
                console.error("Error fetching deliveries:", error);
                toast.error("Failed to load delivery history");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDeliveries();
    }, []);
    if (isLoading) {
        return _jsx("div", { children: "Loading delivery history..." });
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Delivery History" }), _jsxs("div", { className: "grid gap-4", children: [deliveries.map((delivery) => (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-medium", children: ["To: ", delivery.recipient_email] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Status: ", delivery.status] })] }), _jsxs("div", { className: "text-right text-sm text-muted-foreground", children: [delivery.scheduled_date ? (_jsxs("p", { children: ["Scheduled for:", " ", format(new Date(delivery.scheduled_date), "PPP")] })) : (_jsxs("p", { children: ["Created: ", format(new Date(delivery.created_at), "PPP")] })), delivery.sent_date && (_jsxs("p", { children: ["Sent: ", format(new Date(delivery.sent_date), "PPP")] }))] })] }) }, delivery.id))), deliveries.length === 0 && (_jsx("p", { className: "text-center text-muted-foreground", children: "No deliveries yet" }))] })] }));
};
