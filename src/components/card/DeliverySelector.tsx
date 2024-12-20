import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Phone } from "lucide-react";

interface DeliverySelectorProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  isPremium: boolean;
}

const DeliverySelector = ({ selectedMethod, onMethodSelect, isPremium }: DeliverySelectorProps) => {
  const deliveryMethods = [
    { id: "email", icon: Mail, label: "Email" },
    { id: "text", icon: MessageSquare, label: "Text", premium: true },
    { id: "print", icon: Send, label: "Mail", premium: true },
    { id: "call", icon: Phone, label: "Call", premium: true },
  ];

  return (
    <div className="space-y-2">
      <Label>Delivery Method</Label>
      <div className="grid grid-cols-2 gap-4">
        {deliveryMethods.map(({ id, icon: Icon, label, premium }) => (
          <button
            key={id}
            onClick={() => onMethodSelect(id)}
            className={cn(
              "p-4 rounded-lg border text-center capitalize transition-colors flex items-center justify-center gap-2",
              selectedMethod === id
                ? "border-primary bg-primary/10"
                : "border-input hover:bg-accent hover:text-accent-foreground",
              premium && !isPremium && "opacity-50 cursor-not-allowed"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliverySelector;