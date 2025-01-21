import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";
const ContactsList = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const queryClient = useQueryClient();
    const { data: contacts, isLoading } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('name');
            if (error)
                throw error;
            return data.map(contact => ({
                ...contact,
                birthday: contact.birthday ? new Date(contact.birthday) : null
            }));
        }
    });
    const addContactMutation = useMutation({
        mutationFn: async (newContact) => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError)
                throw userError;
            if (!user)
                throw new Error("User not authenticated");
            const { data, error } = await supabase
                .from('contacts')
                .insert([{
                    ...newContact,
                    birthday: newContact.birthday?.toISOString().split('T')[0],
                    user_id: user.id
                }])
                .select()
                .single();
            if (error)
                throw error;
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
        mutationFn: async (contact) => {
            const { data, error } = await supabase
                .from('contacts')
                .update({
                ...contact,
                birthday: contact.birthday?.toISOString().split('T')[0]
            })
                .eq('id', contact.id)
                .select()
                .single();
            if (error)
                throw error;
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
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast.success('Contact deleted successfully');
        },
        onError: (error) => {
            toast.error('Failed to delete contact: ' + error.message);
        }
    });
    const handleSubmit = async (contact) => {
        if (editingContact?.id) {
            updateContactMutation.mutate({ ...contact, id: editingContact.id });
        }
        else {
            addContactMutation.mutate(contact);
        }
    };
    const handleQuickSend = async (contactId, auraColor) => {
        // This will be connected to the gift recommendation system
        toast.success('Opening gift recommendations...');
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { children: "Contacts" }), _jsxs(Button, { onClick: () => {
                            setIsEditing(true);
                            setEditingContact({});
                        }, disabled: isEditing, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), " Add Contact"] })] }), _jsxs(CardContent, { children: [isEditing && (_jsx("div", { className: "mb-6", children: _jsx(ContactForm, { contact: editingContact, onSubmit: handleSubmit, onCancel: () => {
                                setIsEditing(false);
                                setEditingContact(null);
                            } }) })), isLoading ? (_jsx("div", { className: "text-center py-4", children: "Loading contacts..." })) : contacts?.length === 0 ? (_jsx("div", { className: "text-center py-4 text-muted-foreground", children: "No contacts yet. Add your first contact to get started!" })) : (_jsx("div", { className: "space-y-4", children: contacts?.map((contact) => (_jsx(ContactItem, { contact: contact, onEdit: (contact) => {
                                setIsEditing(true);
                                setEditingContact(contact);
                            }, onDelete: (id) => deleteContactMutation.mutate(id), onQuickSend: handleQuickSend }, contact.id))) }))] })] }));
};
export default ContactsList;
