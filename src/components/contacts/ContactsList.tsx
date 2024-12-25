import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Contact } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";
import { AuraColor } from "@/types/gift";

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
    mutationFn: async (newContact: Omit<Contact, "id" | "created_at" | "user_id">) => {
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

  const handleSubmit = async (contact: Omit<Contact, "id" | "created_at" | "user_id">) => {
    if (editingContact?.id) {
      updateContactMutation.mutate({ ...contact, id: editingContact.id });
    } else {
      addContactMutation.mutate(contact);
    }
  };

  const handleQuickSend = async (contactId: string, auraColor: AuraColor) => {
    // This will be connected to the gift recommendation system
    toast.success('Opening gift recommendations...');
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
          <div className="mb-6">
            <ContactForm
              contact={editingContact}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsEditing(false);
                setEditingContact(null);
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-4">Loading contacts...</div>
        ) : contacts?.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No contacts yet. Add your first contact to get started!
          </div>
        ) : (
          <div className="space-y-4">
            {contacts?.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onEdit={(contact) => {
                  setIsEditing(true);
                  setEditingContact(contact);
                }}
                onDelete={(id) => deleteContactMutation.mutate(id)}
                onQuickSend={handleQuickSend}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactsList;
