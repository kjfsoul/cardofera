export type AuraColor = "rose" | "blue" | "green" | "gold";

export interface GiftCategory {
  auraColor: AuraColor;
  name: string;
  items: GiftItem[];
}

export interface GiftItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const AURA_CATEGORIES: Record<AuraColor, string> = {
  rose: "Spa & Wellness",
  blue: "Gaming & Tech",
  green: "Beauty & Fashion",
  gold: "Restaurant & Experience",
};

export const AURA_COLORS: Record<AuraColor, string> = {
  rose: "bg-rose-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  gold: "bg-amber-500",
};
