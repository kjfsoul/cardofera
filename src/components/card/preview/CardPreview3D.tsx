import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThreeScene } from "./useThreeScene";
import { CardLighting } from "./CardLighting";
import { CardMaterial } from "./CardMaterial";
import { CardAnimation } from "./CardAnimation";
import { toast } from "sonner";

interface CardPreview3DProps {
  imageUrl?: string;
  text?: string;
  enableSound?: boolean;
}

const CardPreview3D = ({ imageUrl, text, enableSound = false }: CardPreview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Card mesh setup
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

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({
      opacity: 0.2,
      color: 0x000000,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    sceneRef.current.add(ground);

    // Audio setup
    if (enableSound) {
      audioRef.current = new Audio("/card-open.mp3");
    }

    return () => {
      sceneRef.current?.remove(card, ground);
    };
  }, [enableSound]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle sound interaction
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
            <CardMaterial mesh={cardRef.current} imageUrl={imageUrl} />
          )}
          {cardRef.current && rendererRef.current && sceneRef.current && cameraRef.current && (
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