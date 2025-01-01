import { useEffect } from "react";
import * as THREE from "three";

interface CardLightingProps {
  scene: THREE.Scene;
}

export const CardLighting = ({ scene }: CardLightingProps) => {
  useEffect(() => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    return () => {
      scene.remove(ambientLight, mainLight, fillLight);
    };
  }, [scene]);

  return null;
};