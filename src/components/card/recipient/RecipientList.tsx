import { Check } from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../ui/command";
import { Recipient } from "../../../types/contact";

interface RecipientListProps {
  isLoading: boolean;
  recipients: Recipient[];
  value: Recipient;
  onSelect: (value: Recipient) => void;
  onOpenChange: (open: boolean) => void;
}

export const RecipientList = ({ 
  isLoading, 
  recipients, 
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
        {recipients.map((recipient) => (
          <CommandItem
            key={recipient.name}
            value={recipient.name} // This remains as string for CommandItem
            onSelect={(currentValue) => {
              const selected = recipients.find(r => r.name === currentValue);
              if (selected) {
                onSelect(selected);
                onOpenChange(false);
              }
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value?.name === recipient.name ? "opacity-100" : "opacity-0"
              )}
            />
            <span>{recipient.name}</span>
            {recipient.email && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({recipient.email})
              </span>
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
