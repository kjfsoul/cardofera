import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThreeScene } from "./useThreeScene";
import { CardLighting } from "./CardLighting";
import { CardMaterial } from "./CardMaterial";
import { CardAnimation } from "./CardAnimation";
import { toast } from "sonner";
import type { CardStyle } from "@/types/card";

interface CardPreview3DProps {
  imageUrl?: string;
  text?: string;
  enableSound?: boolean;
  style?: CardStyle;
}

const CardPreview3D = ({
  imageUrl,
  text,
  enableSound = false,
  style = "modern",
}: CardPreview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);

  useEffect(() => {
    if (!sceneRef.current) return;

    const geometry = new THREE.BoxGeometry(3, 4, 0.1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      reflectivity: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });

    const card = new THREE.Mesh(geometry, material);
    card.castShadow = true;
    card.receiveShadow = true;
    card.position.y = 0.5;
    sceneRef.current.add(card);
    cardRef.current = card;

    if (enableSound) {
      audioRef.current = new Audio("/card-open.mp3");
    }

    return () => {
      sceneRef.current?.remove(card);
    };
  }, [enableSound]);

  const handleInteraction = () => {
    if (enableSound && audioRef.current) {
      audioRef.current.play().catch(() => {
        toast.error("Unable to play sound. Please check your browser settings.");
      });
    }
  };

  return (
    <div
      ref={mountRef}
      className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl"
      role="img"
      aria-label="3D card preview"
      onClick={handleInteraction}
    >
      {sceneRef.current && (
        <>
          <CardLighting scene={sceneRef.current} />
          {cardRef.current && (
            <CardMaterial
              mesh={cardRef.current}
              imageUrl={imageUrl}
              style={style}
            />
          )}
          {cardRef.current &&
            rendererRef.current &&
            sceneRef.current &&
            cameraRef.current && (
              <CardAnimation
                card={cardRef.current}
                renderer={rendererRef.current}
                scene={sceneRef.current}
                camera={cameraRef.current}
              />
            )}
        </>
      )}
    </div>
  );
};

export default CardPreview3D;