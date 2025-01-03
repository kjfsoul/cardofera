import { useEffect } from "react";
import * as THREE from "three";
import { toast } from "sonner";

interface CardMaterialProps {
  mesh: THREE.Mesh;
  imageUrl?: string;
  style?: string;
}

const STYLE_TEXTURES = {
  modern: '/public/modern-preview.svg',
  classic: '/public/classic-preview.svg',
  playful: '/public/playful-preview.svg',
  elegant: '/public/elegant-preview.svg'
};

const STYLE_BUMP_MAPS = {
  modern: '/public/modern-bump.png',
  classic: '/public/classic-bump.png',
  playful: '/public/playful-bump.png',
  elegant: '/public/elegant-bump.png'
};

const STYLE_NORMAL_MAPS = {
  modern: '/public/modern-normal.png',
  classic: '/public/classic-normal.png',
  playful: '/public/playful-normal.png',
  elegant: '/public/elegant-normal.png'
};

export const CardMaterial = ({ mesh, imageUrl, style = 'modern' }: CardMaterialProps) => {
  const textureLoader = new THREE.TextureLoader();
  
  useEffect(() => {
    const material = mesh.material as THREE.MeshPhysicalMaterial;
    
    // Load style texture
    textureLoader.load(
      STYLE_TEXTURES[style],
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 16;
        material.map = texture;
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading style texture:", error);
        toast.error("Failed to load style texture");
      }
    );

    // Load bump map
    textureLoader.load(
      STYLE_BUMP_MAPS[style],
      (bumpMap) => {
        material.bumpMap = bumpMap;
        material.bumpScale = 0.02;
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading bump map:", error);
        toast.error("Failed to load bump map");
      }
    );

    // Load normal map
    textureLoader.load(
      STYLE_NORMAL_MAPS[style],
      (normalMap) => {
        material.normalMap = normalMap;
        material.normalScale = new THREE.Vector2(0.5, 0.5);
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading normal map:", error);
        toast.error("Failed to load normal map");
      }
    );

    // Load custom image if provided
    if (imageUrl) {
      textureLoader.load(
        imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 16;
          material.map = texture;
          material.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.error("Error loading image texture:", error);
          toast.error("Failed to load card image");
        }
      );
    }
  }, [imageUrl, mesh, style]);

  return null;
};
