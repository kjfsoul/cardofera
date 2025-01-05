import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList } from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContacts } from "../../hooks/useContacts";
import { RecipientSelectProps, Recipient, Contact } from "../../types/contact";
import { RecipientButton } from "./recipient/RecipientButton";
import { RecipientList } from "./recipient/RecipientList";
import { toast } from "sonner";
import { supabase } from "../../integrations/supabase/client";

const LOCAL_CONTACTS_KEY = "cardofera_local_contacts";

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualRecipient, setManualRecipient] = useState<Recipient>({ name: "", email: "" });

  const { data: contacts = [], isLoading, error } = useContacts();
  const [localRecipients, setLocalRecipients] = useState<Recipient[]>([]);

  // Load local recipients on mount
  useEffect(() => {
    const storedRecipients = localStorage.getItem(LOCAL_CONTACTS_KEY);
    if (storedRecipients) {
      setLocalRecipients(JSON.parse(storedRecipients));
    }
  }, []);

  // Convert contacts to recipients
  const allRecipients = [
    ...contacts.map(contact => ({ name: contact.name, email: contact.email })),
    ...localRecipients
  ];

  const selectedRecipient = allRecipients.find(recipient => recipient.name === value.name) || { name: "", email: "" };

  useEffect(() => {
    if (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load contacts. Please check your authentication.");
    }
  }, [error]);

  const handleAddNewContact = async () => {
    if (!newContact.name.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Signed in user - save to database
        const { data, error: insertError } = await supabase
          .from("contacts")
          .insert({
            name: newContact.name,
            email: newContact.email,
            user_id: user.id,
            relationship: "Friend",
          })
          .select()
          .single();

        if (insertError) throw insertError;

        onChange({ 
          name: data.name, 
          email: data.email
        });
        toast.success("Contact added successfully!");
      } else {
        // Guest user - save to local storage
        const newRecipient = {
          name: newContact.name,
          email: newContact.email
        };
        const updatedRecipients = [...localRecipients, newRecipient];
        setLocalRecipients(updatedRecipients);
        localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(updatedRecipients));
        onChange(newRecipient);
        toast.success("Contact saved locally!");
      }

      setIsAddingNew(false);
      setNewContact({ name: "", email: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact. Please try again.");
    }
  };

  const handleManualEntry = () => {
    if (manualRecipient.name.trim()) {
      onChange(manualRecipient);
      setOpen(false);
      setManualRecipient({ name: "", email: "" });
      setIsManualEntry(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <RecipientButton
          isLoading={isLoading}
          selectedRecipient={selectedRecipient}
          value={value}
          open={open}
        />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search recipients or enter manually..." />
          <CommandList>
            <div className="p-2 border-b">
              <div className="flex gap-2 mb-2">
                <Button
                  size="sm"
                  variant={!isManualEntry ? "default" : "outline"}
                  onClick={() => setIsManualEntry(false)}
                  className="flex-1"
                >
                  Select Contact
                </Button>
                <Button
                  size="sm"
                  variant={isManualEntry ? "default" : "outline"}
                  onClick={() => setIsManualEntry(true)}
                  className="flex-1"
                >
                  Manual Entry
                </Button>
              </div>

              {isManualEntry ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter recipient name"
                    value={manualRecipient.name}
                    onChange={(e) => setManualRecipient(prev => ({ ...prev, name: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && handleManualEntry()}
                  />
                  <Input
                    placeholder="Enter recipient email (optional)"
                    value={manualRecipient.email}
                    onChange={(e) => setManualRecipient(prev => ({ ...prev, email: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && handleManualEntry()}
                  />
                  <Button
                    size="sm"
                    onClick={handleManualEntry}
                    disabled={!manualRecipient.name.trim()}
                    className="w-full"
                  >
                    Use Recipient
                  </Button>
                </div>
              ) : (
                <>
                  <RecipientList
                    isLoading={isLoading}
                    recipients={allRecipients}
                    value={value}
                    onSelect={(recipient) => {
                      onChange(recipient);
                      setOpen(false);
                    }}
                    onOpenChange={setOpen}
                  />
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setIsAddingNew(true)}
                      className="w-full"
                    >
                      Add New Contact
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;
