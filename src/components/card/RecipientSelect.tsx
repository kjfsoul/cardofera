import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RecipientSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface Contact {
  id: string;
  name: string;
  user_id: string;
}

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);

  const { data: contacts = [], isLoading, error } = useQuery({
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
          .eq("user_id", session.user.id);

        if (error) {
          console.error("Supabase error:", error);
          toast.error("Failed to load contacts");
          return [];
        }

        return (data || []) as Contact[];
      } catch (err) {
        console.error("Error fetching contacts:", err);
        toast.error("Failed to load contacts");
        return [];
      }
    },
    initialData: [], // Ensure we always have an array
    refetchOnWindowFocus: false,
  });

  if (error) {
    console.error("Query error:", error);
  }

  const selectedContact = contacts.find((contact) => contact.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {isLoading ? (
            "Loading contacts..."
          ) : selectedContact ? (
            selectedContact.name
          ) : value || (
            "Select recipient..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search recipients..." />
          <CommandEmpty>
            {isLoading ? "Loading..." : "No recipient found."}
          </CommandEmpty>
          <CommandGroup>
            {(contacts || []).map((contact) => (
              <CommandItem
                key={contact.id}
                value={contact.name}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === contact.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {contact.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;