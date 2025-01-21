import React from 'react';
import CardPreview3D from '@/components/3d/CardPreview3D';
import { CardDownloadShare } from '@/components/shared/CardDownloadShare';

interface CardPreviewSectionProps {
  imageUrl: string | null;
  selectedImage: string | null;
  cardMessage: string;
  isSoundEnabled: boolean;
  cardStyle: string;
  textPosition: "center" | "right" | "left";
  fontSize: number;
  fontFamily: string;
}


const CardPreviewSection = ({
  cardMessage,
  isSoundEnabled,
  cardStyle,
  imageUrl
}: CardPreviewSectionProps) => {
  const handleRenderError = () => {
    console.error('Render error occurred');
  };

  return (
    <div className="preview-section">
      <CardPreview3D
        key={imageUrl}
        imageUrl={imageUrl}
        text={cardMessage}
        enableSound={isSoundEnabled}
        style={cardStyle}
      />
      <CardDownloadShare />
    </div>
  );
};

export default CardPreviewSection;
