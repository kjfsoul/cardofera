import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  birthday: string;
  relationship: string;
  avatar?: string;
  auraColor?: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    birthday: "2024-04-15",
    relationship: "Sister",
    auraColor: "blue", // Spa & Wellness
  },
  {
    id: "2",
    name: "Mike Smith",
    birthday: "2024-04-20",
    relationship: "Friend",
    avatar: "/placeholder.svg",
    auraColor: "purple", // Gaming & Tech
  },
  {
    id: "3",
    name: "Emma Davis",
    birthday: "2024-05-01",
    relationship: "Colleague",
    auraColor: "pink", // Beauty & Fashion
  },
];

const auraCategories = {
  blue: "Spa & Wellness Packages",
  purple: "Gaming & Tech Gadgets",
  pink: "Beauty & Fashion Items",
  green: "Outdoor & Adventure Gear",
  yellow: "Restaurant & Entertainment",
  orange: "Creative & Artistic Supplies",
};

const BirthdayList = () => {
  const handleQuickSend = (contact: Contact) => {
    toast.success(`Generating surprise ${auraCategories[contact.auraColor as keyof typeof auraCategories]} for ${contact.name}!`);
  };

  const getDaysUntilBirthday = (birthday: string) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    const diffTime = birthdayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Birthdays
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockContacts
          .sort((a, b) => getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday))
          .map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.relationship} • {getDaysUntilBirthday(contact.birthday)} days away
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-3 h-3 rounded-full bg-${contact.auraColor}-500`}
                      title={auraCategories[contact.auraColor as keyof typeof auraCategories]}
                    />
                    <span className="text-xs text-muted-foreground">
                      {auraCategories[contact.auraColor as keyof typeof auraCategories]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSend(contact)}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Quick Send
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default BirthdayList;