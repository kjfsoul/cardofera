import { Calendar, Gift, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionKey } from "@/pages/Index";

interface NavigationButtonsProps {
  activeSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
}

const NavigationButtons = ({
  activeSection,
  onSectionChange,
}: NavigationButtonsProps) => {
  const buttons: { id: SectionKey; label: string; icon: typeof Mail }[] = [
    { id: "cards", label: "Birthday Cards", icon: Mail },
    { id: "gifts", label: "Gift Finder", icon: Gift },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "recipients", label: "Recipients", icon: Plus },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {buttons.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeSection === id ? "default" : "outline"}
          onClick={() => onSectionChange(id)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default NavigationButtons;
