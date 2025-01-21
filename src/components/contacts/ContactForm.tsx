import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contact } from "@/types/database";
import { format } from "date-fns";

interface ContactFormProps {
  contact?: Partial<Contact>;
  onSubmit: (
    contact: Omit<Contact, "id" | "created_at" | "user_id">,
  ) => Promise<void>;
  onCancel: () => void;
}

const ContactForm = ({ contact, onSubmit, onCancel }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    relationship: contact?.relationship || "",
    birthday: contact?.birthday
      ? format(new Date(contact.birthday), "yyyy-MM-dd")
      : "",
    preferred_categories: contact?.preferred_categories || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name: formData.name,
      relationship: formData.relationship,
      birthday: formData.birthday ? new Date(formData.birthday) : null,
      preferred_categories: formData.preferred_categories,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Contact name"
        />
      </div>
      <div>
        <Label htmlFor="relationship">Relationship</Label>
        <Input
          id="relationship"
          value={formData.relationship}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, relationship: e.target.value }))
          }
          placeholder="e.g. Friend, Family"
        />
      </div>
      <div>
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          id="birthday"
          type="date"
          value={formData.birthday}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, birthday: e.target.value }))
          }
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {contact?.id ? "Update" : "Add"} Contact
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
