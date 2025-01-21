import { useEffect, useRef } from "react";
import * as THREE from "three";
import { toast } from "sonner";

type CardStyle = 'modern' | 'classic' | 'playful' | 'elegant';

interface CardMaterialProps {
  mesh: THREE.Mesh;
  imageUrl?: string;
  style: CardStyle;
  imageScale?: number;
  imagePosition?: { x: number; y: number };
}

const STYLE_TEXTURES: Record<CardStyle, string> = {
  modern: "/public/modern-preview.svg",
  classic: "/public/classic-preview.svg",
  playful: "/public/playful-preview.svg",
  elegant: "/public/elegant-preview.svg",
};

const STYLE_MATERIALS: Record<CardStyle, {
  color: number;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  reflectivity: number;
  bumpScale: number;
}> = {
  modern: {
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
    bumpScale: 0.1,
  },
  classic: {
    color: 0xfaf3e0,
    metalness: 0.2,
    roughness: 0.4,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    reflectivity: 0.6,
    bumpScale: 0.2,
  },
  playful: {
    color: 0xff9a9e,
    metalness: 0.1,
    roughness: 0.6,
    clearcoat: 0.3,
    clearcoatRoughness: 0.5,
    reflectivity: 0.4,
    bumpScale: 0.3,
  },
  elegant: {
    color: 0xf8f8f8,
    metalness: 0.9,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    bumpScale: 0.05,
  },
};

const STYLE_BUMP_MAPS: Record<CardStyle, string> = {
  modern: "/public/modern-bump.png",
  classic: "/public/classic-bump.png",
  playful: "/public/playful-bump.png",
  elegant: "/public/elegant-bump.png",
};

const STYLE_NORMAL_MAPS: Record<CardStyle, string> = {
  modern: "/public/modern-normal.png",
  classic: "/public/classic-normal.png",
  playful: "/public/playful-normal.png",
  elegant: "/public/elegant-normal.png",
};

export const CardMaterial = ({
  mesh,
  imageUrl,
  style,
  imageScale,
  imagePosition,
}: CardMaterialProps) => {
  const textureLoader = new THREE.TextureLoader();
  const imageTextureRef = useRef<THREE.Texture | null>(null);
  const styleTextureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    const material = mesh.material as THREE.MeshPhysicalMaterial;

    const styleProps = STYLE_MATERIALS[style];
    Object.assign(material, styleProps);

    textureLoader.load(
      STYLE_TEXTURES[style],
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 16;
        styleTextureRef.current = texture;
        updateMaterialTextures(material);
      },
      undefined,
      (error) => {
        console.error("Error loading style texture:", error);
        toast.error("Failed to load style texture");
      },
    );

    textureLoader.load(
      STYLE_BUMP_MAPS[style],
      (bumpMap) => {
        material.bumpMap = bumpMap;
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading bump map:", error);
        toast.error("Failed to load bump map");
      },
    );

    textureLoader.load(
      STYLE_NORMAL_MAPS[style],
      (normalMap) => {
        material.normalMap = normalMap;
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading normal map:", error);
        toast.error("Failed to load normal map");
      },
    );
  }, [mesh, style]);

  useEffect(() => {
    const material = mesh.material as THREE.MeshPhysicalMaterial;

    if (imageUrl) {
      textureLoader.load(
        imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 16;
          imageTextureRef.current = texture;
          updateMaterialTextures(material);
        },
        undefined,
        (error) => {
          console.error("Error loading image texture:", error);
          toast.error("Failed to load card image");
        },
      );
    } else {
      imageTextureRef.current = null;
      updateMaterialTextures(material);
    }
  }, [imageUrl, mesh]);

  const updateMaterialTextures = (material: THREE.MeshPhysicalMaterial) => {
    if (imageTextureRef.current && styleTextureRef.current) {
      const uniforms = {
        uStyleTexture: { value: styleTextureRef.current },
        uImageTexture: { value: imageTextureRef.current },
        uImageScale: { value: imageScale || 1.0 },
        uImagePosition: {
          value: new THREE.Vector2(
            imagePosition?.x || 0.5,
            imagePosition?.y || 0.5,
          ),
        },
        uBorderColor: { value: new THREE.Color(0xffffff) },
        uBorderWidth: { value: 0.05 },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uStyleTexture;
        uniform sampler2D uImageTexture;
        uniform float uImageScale;
        uniform vec2 uImagePosition;
        uniform vec3 uBorderColor;
        uniform float uBorderWidth;
        varying vec2 vUv;
        
        void main() {
          vec2 imageUv = (vUv - uImagePosition) / uImageScale + 0.5;
          vec4 styleColor = texture2D(uStyleTexture, vUv);
          vec4 imageColor = texture2D(uImageTexture, imageUv);
          float border = smoothstep(0.0, uBorderWidth, vUv.x) *
                         smoothstep(1.0, 1.0 - uBorderWidth, vUv.x) *
                         smoothstep(0.0, uBorderWidth, vUv.y) *
                         smoothstep(1.0, 1.0 - uBorderWidth, vUv.y);
          vec4 finalColor = mix(styleColor, imageColor, imageColor.a * border);
          finalColor.rgb = mix(uBorderColor, finalColor.rgb, border);
          gl_FragColor = finalColor;
        }
      `;

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
      });

      mesh.material = shaderMaterial;
    } else if (imageTextureRef.current) {
      material.map = imageTextureRef.current;
      material.needsUpdate = true;
    } else if (styleTextureRef.current) {
      material.map = styleTextureRef.current;
      material.needsUpdate = true;
    }
  };

  return null;
};
