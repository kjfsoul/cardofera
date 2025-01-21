import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContacts } from "../../hooks/useContacts";
import { RecipientSelectProps, Recipient } from "../../types/contact";
import { RecipientButton } from "./recipient/RecipientButton";
import { RecipientList } from "./recipient/RecipientList";
import { toast } from "sonner";

const RecipientSelect = ({ value, onChange }: RecipientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualRecipient, setManualRecipient] = useState<Recipient>({
    name: "",
    email: "",
  });

  const { data: contacts = [], isLoading } = useContacts();

  // Convert contacts to recipients
  const recipients = contacts.map((contact) => ({
    name: contact.name,
    email: contact.email || "",
  }));

  const handleManualEntry = () => {
    if (!manualRecipient.name.trim()) {
      toast.error("Please enter a recipient name");
      return;
    }
    onChange(manualRecipient);
    setOpen(false);
    setManualRecipient({ name: "", email: "" });
    setIsManualEntry(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <RecipientButton
          isLoading={isLoading}
          selectedRecipient={value}
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
                    onChange={(e) =>
                      setManualRecipient((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Enter recipient email (optional)"
                    value={manualRecipient.email}
                    onChange={(e) =>
                      setManualRecipient((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
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
                <RecipientList
                  isLoading={isLoading}
                  recipients={recipients}
                  value={value}
                  onSelect={(recipient) => {
                    onChange(recipient);
                    setOpen(false);
                  }}
                  onOpenChange={setOpen}
                />
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipientSelect;