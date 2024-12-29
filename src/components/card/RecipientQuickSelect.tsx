import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { User, Plus } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";
import { toast } from "sonner";

interface RecipientQuickSelectProps {
  value: string;
  onChange: (value: string) => void;
  onAddNew: () => void;
}

const RecipientQuickSelect = ({ value, onChange, onAddNew }: RecipientQuickSelectProps) => {
  const { data: contacts = [], isLoading } = useContacts();
  const [recentRecipients, setRecentRecipients] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentRecipients");
    if (stored) {
      setRecentRecipients(JSON.parse(stored));
    }
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    const updated = [name, ...recentRecipients.filter(r => r !== name)].slice(0, 5);
    setRecentRecipients(updated);
    localStorage.setItem("recentRecipients", JSON.stringify(updated));
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading contacts...</div>;
  }

  return (
    <div className="space-y-4">
      {recentRecipients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recentRecipients.map((name) => (
            <Button
              key={name}
              variant="outline"
              size="sm"
              onClick={() => handleSelect(name)}
              className={value === name ? "bg-primary/10" : ""}
            >
              <User className="h-4 w-4 mr-2" />
              {name}
            </Button>
          ))}
        </div>
      )}

      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search recipients..." />
        <CommandList>
          <CommandEmpty>
            No recipients found.
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddNew}
              className="mt-2 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Contact
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {contacts.map((contact) => (
              <CommandItem
                key={contact.id}
                value={contact.name}
                onSelect={() => handleSelect(contact.name)}
              >
                <User className="h-4 w-4 mr-2" />
                {contact.name}
                {contact.relationship && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({contact.relationship})
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default RecipientQuickSelect;