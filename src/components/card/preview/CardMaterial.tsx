import { useEffect } from "react";
import * as THREE from "three";
import { toast } from "sonner";

interface CardMaterialProps {
  mesh: THREE.Mesh;
  imageUrl?: string;
}

export const CardMaterial = ({ mesh, imageUrl }: CardMaterialProps) => {
  useEffect(() => {
    if (!imageUrl) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 16;
        (mesh.material as THREE.MeshPhysicalMaterial).map = texture;
        (mesh.material as THREE.MeshPhysicalMaterial).needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        toast.error("Failed to load card image");
      }
    );
  }, [imageUrl, mesh]);

  return null;
};