import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Contact } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Gift } from "lucide-react";
import { format } from "date-fns";

const ContactsList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(null);
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Contact[];
    }
  });

  const addContactMutation = useMutation({
    mutationFn: async (newContact: Omit<Contact, 'id' | 'created_at' | 'user_id'>) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert([newContact])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact added successfully');
      setIsEditing(false);
      setEditingContact(null);
    },
    onError: (error) => {
      toast.error('Failed to add contact: ' + error.message);
    }
  });

  const updateContactMutation = useMutation({
    mutationFn: async (contact: Partial<Contact>) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(contact)
        .eq('id', contact.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated successfully');
      setIsEditing(false);
      setEditingContact(null);
    },
    onError: (error) => {
      toast.error('Failed to update contact: ' + error.message);
    }
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete contact: ' + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact?.name || !editingContact?.relationship) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingContact.id) {
      updateContactMutation.mutate(editingContact);
    } else {
      addContactMutation.mutate(editingContact as Omit<Contact, 'id' | 'created_at' | 'user_id'>);
    }
  };

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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contacts</CardTitle>
        <Button
          onClick={() => {
            setIsEditing(true);
            setEditingContact({});
          }}
          disabled={isEditing}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Contact
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editingContact?.name || ''}
                onChange={(e) => setEditingContact(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Contact name"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={editingContact?.relationship || ''}
                onChange={(e) => setEditingContact(prev => ({ ...prev, relationship: e.target.value }))}
                placeholder="e.g. Friend, Family"
              />
            </div>
            <div>
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                type="date"
                value={editingContact?.birthday ? format(new Date(editingContact.birthday), 'yyyy-MM-dd') : ''}
                onChange={(e) => setEditingContact(prev => ({ ...prev, birthday: e.target.value ? new Date(e.target.value) : null }))}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingContact?.id ? 'Update' : 'Add'} Contact
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingContact(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center py-4">Loading contacts...</div>
        ) : contacts?.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No contacts yet. Add your first contact to get started!
          </div>
        ) : (
          <div className="space-y-4">
            {contacts?.sort((a, b) => {
              const daysA = getDaysUntilBirthday(a.birthday ? new Date(a.birthday) : null) || Infinity;
              const daysB = getDaysUntilBirthday(b.birthday ? new Date(b.birthday) : null) || Infinity;
              return daysA - daysB;
            }).map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5"
              >
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.relationship}
                    {contact.birthday && (
                      <> • {getDaysUntilBirthday(new Date(contact.birthday))} days until birthday</>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setIsEditing(true);
                      setEditingContact(contact);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this contact?')) {
                        deleteContactMutation.mutate(contact.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => {
                      // This will be connected to the gift recommendation system
                      toast.success('Opening gift recommendations...');
                    }}
                  >
                    <Gift className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactsList;