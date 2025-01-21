import { Button } from "../../../components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Recipient } from "../../../types/contact";

interface RecipientButtonProps {
  isLoading: boolean;
  selectedRecipient: Recipient;
  value: Recipient;
  open: boolean;
}

export const RecipientButton = ({
  isLoading,
  selectedRecipient,
  value,
  open,
}: RecipientButtonProps) => {
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
        : selectedRecipient?.name
          ? selectedRecipient.name
          : value?.name || "Select recipient..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
};
