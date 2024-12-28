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
  relationship?: string;
  birthday?: string;
}

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to view contacts");
        return [];
      }

      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, user_id, relationship, birthday")
        .eq("user_id", session.user.id)
        .order("name");

      if (error) {
        toast.error("Failed to load contacts");
        return [];
      }

      return data || [];
    },
    initialData: [],
    retry: 1,
    staleTime: 30000,
  });

  const selectedContact = contacts?.find((contact) => contact.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          {selectedContact?.name || "Select recipient..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search recipients..." />
          <CommandEmpty>
            {isLoading ? (
              "Loading contacts..."
            ) : (
              "No recipient found. Add a new contact?"
            )}
          </CommandEmpty>
          <CommandGroup>
            {contacts?.map((contact) => (
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
                <span>{contact.name}</span>
                {contact.relationship && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({contact.relationship})
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;
