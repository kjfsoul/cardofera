export interface Contact {
  id: string;
  name: string;
  relationship: string;
  birthday: Date | null;
  preferred_categories: string[];
  user_id: string;
  created_at: string;
}

export interface GiftRecommendation {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
}
