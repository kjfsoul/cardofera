import { useEffect } from "react";
import * as THREE from "three";

interface CardMeshProps {
  scene: THREE.Scene;
  cardRef: React.MutableRefObject<THREE.Mesh | null>;
  style?: string;
}

export const CardMesh = ({ scene, cardRef, style = "modern" }: CardMeshProps) => {
  useEffect(() => {
    // Create folded card geometry with two panels
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

    // Create and configure the card mesh
    const card = new THREE.Mesh(frontGeometry, material);
    card.castShadow = true;
    card.receiveShadow = true;
    card.position.y = 0.5;
    
    scene.add(card);
    cardRef.current = card;

    // Add subtle texture to the card surface
    const textureLoader = new THREE.TextureLoader();
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
      }
    );

    return () => {
      scene.remove(card);
    };
  }, [scene, style]);

  return null;
};