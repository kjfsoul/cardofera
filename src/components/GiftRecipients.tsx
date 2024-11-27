import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gift, Plus, Tag } from "lucide-react";
import { toast } from "sonner";

interface Recipient {
  id: string;
  name: string;
  relationship: string;
  preferences: string;
}

const GiftRecipients = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    relationship: "",
    preferences: "",
  });

  const handleAddRecipient = () => {
    if (!newRecipient.name || !newRecipient.relationship) {
      toast.error("Please fill in all required fields");
      return;
    }

    const recipient: Recipient = {
      id: Date.now().toString(),
      ...newRecipient,
    };

    setRecipients([...recipients, recipient]);
    setNewRecipient({ name: "", relationship: "", preferences: "" });
    toast.success("Recipient added successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Gift Recipients
        </CardTitle>
        <CardDescription>
          Manage your gift recipients and their preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newRecipient.name}
                onChange={(e) =>
                  setNewRecipient({ ...newRecipient, name: e.target.value })
                }
                placeholder="Enter recipient name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={newRecipient.relationship}
                onChange={(e) =>
                  setNewRecipient({ ...newRecipient, relationship: e.target.value })
                }
                placeholder="e.g., Friend, Family, Colleague"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preferences">Gift Preferences</Label>
              <Input
                id="preferences"
                value={newRecipient.preferences}
                onChange={(e) =>
                  setNewRecipient({ ...newRecipient, preferences: e.target.value })
                }
                placeholder="Enter gift preferences"
              />
            </div>
          </div>
          <Button onClick={handleAddRecipient} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Recipient
          </Button>
        </div>

        <div className="space-y-4">
          {recipients.map((recipient) => (
            <div
              key={recipient.id}
              className="flex flex-col gap-2 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{recipient.name}</h3>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-1" />
                  {recipient.relationship}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Preferences: {recipient.preferences || "None specified"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftRecipients;