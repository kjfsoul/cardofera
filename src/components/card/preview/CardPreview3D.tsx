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

    // Create a folded card geometry
    const frontGeometry = new THREE.BoxGeometry(3, 4, 0.1);
    const backGeometry = new THREE.BoxGeometry(3, 4, 0.1);
    
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      reflectivity: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });

    // Create front and back panels
    const frontPanel = new THREE.Mesh(frontGeometry, material);
    const backPanel = new THREE.Mesh(backGeometry, material);

    // Position the panels
    frontPanel.position.set(1.5, 0.5, 0);
    backPanel.position.set(-1.5, 0.5, 0);

    // Create a group to hold both panels
    const cardGroup = new THREE.Group();
    cardGroup.add(frontPanel);
    cardGroup.add(backPanel);

    sceneRef.current.add(cardGroup);
    cardRef.current = cardGroup;

    if (enableSound) {
      audioRef.current = new Audio("/card-open.mp3");
    }

    return () => {
      sceneRef.current?.remove(cardGroup);
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
          <CardLighting scene={sceneRef.current} style={style} />
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