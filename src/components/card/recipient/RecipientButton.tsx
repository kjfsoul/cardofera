import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Contact } from "@/types/contact";

interface RecipientButtonProps {
  isLoading: boolean;
  selectedContact: Contact | undefined;
  value: string;
  open: boolean;
}

export const RecipientButton = ({ isLoading, selectedContact, value, open }: RecipientButtonProps) => {
  return (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between"
      disabled={isLoading}
    >
      {isLoading 
        ? "Loading contacts..." 
        : selectedContact 
          ? selectedContact.name 
          : value || "Select recipient..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
};