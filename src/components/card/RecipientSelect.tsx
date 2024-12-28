import { useState } from "react";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/useContacts";
import { RecipientSelectProps } from "@/types/contact";
import { RecipientButton } from "./recipient/RecipientButton";
import { RecipientList } from "./recipient/RecipientList";
import { toast } from "sonner";

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newContactName, setNewContactName] = useState("");

  const { data: contacts = [], isLoading } = useContacts();
  const selectedContact = contacts.find((contact) => contact.name === value);

  const handleAddNewContact = async () => {
    if (!newContactName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to add contacts");
        return;
      }

      const { data, error } = await supabase
        .from("contacts")
        .insert({
          name: newContactName,
          user_id: user.id,
          relationship: "Friend",
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
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <RecipientButton
          isLoading={isLoading}
          selectedContact={selectedContact}
          value={value}
          open={open}
        />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search recipients..." />
          <CommandList>
            {isAddingNew ? (
              <div className="p-2">
                <Input
                  placeholder="Enter contact name"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddNewContact();
                    }
                  }}
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
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewContactName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <RecipientList
                isLoading={isLoading}
                contacts={contacts}
                value={value}
                onSelect={onChange}
                onOpenChange={setOpen}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;