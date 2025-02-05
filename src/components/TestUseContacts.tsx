import React from 'react';
import { useContacts, Contact } from '../../hooks/useContacts';

const TestUseContacts = () => {
  const { data: contacts, isLoading, isError } = useContacts();

  if (isLoading) return <div>Loading contacts...</div>;
  if (isError) return <div>Error loading contacts.</div>;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact: Contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestUseContacts;