import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newContactName, setNewContactName] = useState("");

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to view contacts");
        return [];
      }

      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, user_id, relationship, birthday")
        .eq("user_id", user.id)
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

  const handleAddNewContact = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("contacts")
        .insert({
          name: newContactName,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      onChange(data.name);
      setIsAddingNew(false);
      setNewContactName("");
      setOpen(false);
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error("Failed to add contact");
    }
  };

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
            ) : isAddingNew ? (
              <div className="p-2">
                <Input
                  placeholder="Enter contact name"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleAddNewContact}
                    disabled={!newContactName.trim()}
                  >
                    Add Contact
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingNew(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full p-2"
                onClick={() => setIsAddingNew(true)}
              >
                Add new contact
              </Button>
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
