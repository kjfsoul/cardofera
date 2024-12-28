export interface Contact {
  id: string;
  name: string;
  user_id: string;
  relationship: string;
  birthday?: string;
  preferred_categories?: string[];
}

export interface RecipientSelectProps {
  value: string;
  onChange: (value: string) => void;
}