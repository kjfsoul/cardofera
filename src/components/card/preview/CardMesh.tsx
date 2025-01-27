import { useEffect } from "react";
import * as THREE from "three";
import { toast } from "sonner";

interface CardMeshProps {
  scene: THREE.Scene;
  cardRef: React.MutableRefObject<THREE.Mesh | null>;
  style?: string;
  textureUrl?: string;
}

export const CardMesh = ({ 
  scene, 
  cardRef, 
  style = "modern",
  textureUrl,
}: CardMeshProps) => {
  useEffect(() => {
    const frontGeometry = new THREE.BoxGeometry(3, 4, 0.1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      reflectivity: 0.7,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });

    const card = new THREE.Mesh(frontGeometry, material);
    card.castShadow = true;
    card.receiveShadow = true;
    card.position.y = 0.5;
    
    scene.add(card);
    cardRef.current = card;

    const textureLoader = new THREE.TextureLoader();
    
    // Load default paper texture
    textureLoader.load(
      '/paper-texture.jpg',
      (texture) => {
        texture.repeat.set(1, 1);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        if (cardRef.current) {
          (cardRef.current.material as THREE.MeshPhysicalMaterial).normalMap = texture;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).normalScale.set(0.05, 0.05);
        }
      },
      undefined,
      (error) => {
        console.error("Error loading default texture:", error);
      }
    );

    return () => {
      scene.remove(card);
    };
  }, [scene, style]);

  // Handle texture updates
  useEffect(() => {
    if (!textureUrl || !cardRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.repeat.set(2, 2); // Adjust tiling
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        if (cardRef.current) {
          (cardRef.current.material as THREE.MeshPhysicalMaterial).map = texture;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        toast.error("Failed to load texture, using default");
      }
    );
  }, [textureUrl]);

  return null;
};