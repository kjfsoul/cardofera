import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "./useThreeScene";
import { LightingSetup } from "./LightingSetup";
import { CardMesh } from "./CardMesh";
import { CameraController } from "./CameraController";
import { toast } from "sonner";

interface CardPreview3DProps {
  imageUrl?: string;
  text?: string;
  enableSound?: boolean;
  style?: string;
  textureUrl?: string;
}

const CardPreview3D = ({
  imageUrl,
  text,
  enableSound = false,
  style = "modern",
  textureUrl,
}: CardPreview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);

  useEffect(() => {
    if (enableSound) {
      audioRef.current = new Audio("/card-open.mp3");
    }
  }, [enableSound]);

  useEffect(() => {
    if (!imageUrl || !cardRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        if (cardRef.current) {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 16;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).map = texture;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        toast.error("Failed to load card image");
      }
    );
  }, [imageUrl]);

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
          <LightingSetup scene={sceneRef.current} style={style} />
          {cardRef.current && (
            <CardMesh
              scene={sceneRef.current}
              cardRef={cardRef}
              style={style}
              textureUrl={textureUrl}
            />
          )}
          {cameraRef.current && rendererRef.current && (
            <CameraController
              camera={cameraRef.current}
              renderer={rendererRef.current}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardPreview3D;