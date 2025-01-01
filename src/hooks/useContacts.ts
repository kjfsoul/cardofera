import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Contact } from "@/types/contact";
import { toast } from "sonner";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          return [];
        }

        const { data, error } = await supabase
          .from("contacts")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching contacts:", error);
          throw error;
        }

        return data as Contact[] || [];
      } catch (err) {
        console.error("Error in contacts query:", err);
        throw err;
      }
    },
    initialData: [],
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
  });
};