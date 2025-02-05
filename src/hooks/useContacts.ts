import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Contact } from "@/types/contact";
import { toast } from "sonner";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();

        console.log("Auth session check:", { session, authError });

        if (authError) {
          console.error("Authentication error:", authError);
          toast.error("Authentication failed. Please sign in again.");
          return [];
        }

        if (!session) {
          console.log("No active session - redirecting to sign in");
          window.location.href = "/signin";
          return [];
        }

        // Only fetch contacts belonging to the current user:
        const userId = session.user.id;
        const { data, error } = await supabase
          .from("contacts")
          .select("*")
          .eq("user_id", userId) // added filter here
          .order("name");

        if (error) {
          console.error("Error fetching contacts:", error);
          toast.error("Failed to load contacts. Please try again.");
          throw error;
        }

        console.log("Fetched contacts:", data);
        return (data as Contact[]) || [];
      } catch (err) {
        console.error("Error in contacts query:", err);
        toast.error("An unexpected error occurred while loading contacts.");
        throw err;
      }
    },
    initialData: [],
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
  });
};
