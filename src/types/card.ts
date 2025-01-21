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
}

export interface CardGeneratorProps {
  cardData: CardData;
  setCardData: (data: CardData) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
  progress: number;
  isPremium: boolean;
  generationError?: string | null;
}