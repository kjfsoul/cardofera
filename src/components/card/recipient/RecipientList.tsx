import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Contact } from "@/types/contact";

interface RecipientListProps {
  isLoading: boolean;
  contacts: Contact[];
  value: string;
  onSelect: (value: string) => void;
  onOpenChange: (open: boolean) => void;
}

export const RecipientList = ({ 
  isLoading, 
  contacts, 
  value, 
  onSelect,
  onOpenChange 
}: RecipientListProps) => {
  return (
    <>
      <CommandEmpty>
        {isLoading ? "Loading..." : "No recipient found."}
      </CommandEmpty>
      <CommandGroup>
        {contacts.map((contact) => (
          <CommandItem
            key={contact.id}
            value={contact.name}
            onSelect={(currentValue) => {
              onSelect(currentValue === value ? "" : currentValue);
              onOpenChange(false);
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
    </>
  );
};