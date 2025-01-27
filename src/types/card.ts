import { Recipient } from "./contact";

export type CardStyle = "modern" | "classic" | "playful" | "elegant";

export interface CardData {
  recipient: Recipient;
  occasion: string;
  message: string;
  style: CardStyle;
  deliveryMethod: string;
  textPosition: "left" | "center" | "right";
  fontSize: number;
  fontFamily: string;
  texture?: string; // Added texture property as optional
}

export interface CardGeneratorProps {
  cardData: CardData;
  setCardData: (data: CardData) => void;
  selectedImage: string | undefined;
  setSelectedImage: (image: string | undefined) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
  progress: number;
  isPremium: boolean;
  generationError: string | null;
}