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
          toast.error("Please sign in to view contacts");
          return [];
        }

        const { data, error } = await supabase
          .from("contacts")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching contacts:", error);
          toast.error("Failed to load contacts");
          return [];
        }

        return data as Contact[] || [];
      } catch (err) {
        console.error("Error in contacts query:", err);
        toast.error("Failed to load contacts");
        return [];
      }
    },
    initialData: [],
  });
};