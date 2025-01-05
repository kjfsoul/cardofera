export interface Contact {
  id: string;
  name: string;
  email?: string;
  user_id: string;
  relationship: string;
  birthday?: string;
  preferred_categories?: string[];
  isLocal?: boolean;
}

export interface Recipient {
  name: string;
  email?: string;
}

export interface RecipientSelectProps {
  value: Recipient;
  onChange: (value: Recipient) => void;
}
