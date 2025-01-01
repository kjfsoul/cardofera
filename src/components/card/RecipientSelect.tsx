import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualRecipient, setManualRecipient] = useState("");

  const { data: contacts = [], isLoading, error } = useContacts();
  const selectedContact = contacts.find((contact) => contact.name === value);

  useEffect(() => {
    if (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load contacts. Please check your authentication.");
    }
  }, [error]);

  const handleAddNewContact = async () => {
    if (!newContactName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to add contacts");
        return;
      }

      const { data, error: insertError } = await supabase
        .from("contacts")
        .insert({
          name: newContactName,
          user_id: user.id,
          relationship: "Friend",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      onChange(data.name);
      setIsAddingNew(false);
      setNewContactName("");
      setOpen(false);
      toast.success("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact. Please try again.");
    }
  };

  const handleManualEntry = () => {
    if (manualRecipient.trim()) {
      onChange(manualRecipient);
      setOpen(false);
      setManualRecipient("");
      setIsManualEntry(false);
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
          <CommandInput placeholder="Search recipients or enter manually..." />
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
            ) : isManualEntry ? (
              <div className="p-2">
                <Input
                  placeholder="Enter recipient name"
                  value={manualRecipient}
                  onChange={(e) => setManualRecipient(e.target.value)}
                  className="mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleManualEntry();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleManualEntry}
                    disabled={!manualRecipient.trim()}
                  >
                    Use Name
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setIsManualEntry(false);
                      setManualRecipient("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <RecipientList
                  isLoading={isLoading}
                  contacts={contacts}
                  value={value}
                  onSelect={onChange}
                  onOpenChange={setOpen}
                />
                <div className="p-2 border-t flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingNew(true)}
                    className="flex-1"
                  >
                    Add New Contact
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsManualEntry(true)}
                    className="flex-1"
                  >
                    Enter Manually
                  </Button>
                </div>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;