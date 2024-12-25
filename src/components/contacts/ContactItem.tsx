import { Button } from "@/components/ui/button";
import { Contact } from "@/types/database";
import { Edit2, Trash2, Gift } from "lucide-react";
import { format } from "date-fns";
import QuickSendGift from "../gift/QuickSendGift";
import { useState } from "react";
import { AuraColor } from "@/types/gift";

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onQuickSend: (contactId: string, auraColor: AuraColor) => Promise<void>;
}

const ContactItem = ({ contact, onEdit, onDelete, onQuickSend }: ContactItemProps) => {
  const [showQuickSend, setShowQuickSend] = useState(false);

  const getDaysUntilBirthday = (birthday: Date | null) => {
    if (!birthday) return null;
    const today = new Date();
    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    return Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysUntilBirthday = contact.birthday ? getDaysUntilBirthday(new Date(contact.birthday)) : null;

  return (
    <div className="p-4 border rounded-lg hover:bg-accent/5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{contact.name}</h3>
          <p className="text-sm text-muted-foreground">
            {contact.relationship}
            {daysUntilBirthday !== null && (
              <> • {daysUntilBirthday} days until birthday</>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(contact)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this contact?")) {
                onDelete(contact.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowQuickSend(!showQuickSend)}
          >
            <Gift className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showQuickSend && (
        <div className="mt-4">
          <QuickSendGift
            recipientName={contact.name}
            onSend={(auraColor) => onQuickSend(contact.id, auraColor)}
          />
        </div>
      )}
    </div>
  );
};

export default ContactItem;