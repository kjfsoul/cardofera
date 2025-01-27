import { useEffect } from "react";
import * as THREE from "three";

interface LightingSetupProps {
  scene: THREE.Scene;
  style?: string;
}

export const LightingSetup = ({ scene, style = "modern" }: LightingSetupProps) => {
  useEffect(() => {
    // Main ambient light for overall scene illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Primary directional light for main shadows
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Fill light for softer shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Back light for edge definition
    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    return () => {
      scene.remove(ambientLight, mainLight, fillLight, backLight);
    };
  }, [scene, style]);

  return null;
};