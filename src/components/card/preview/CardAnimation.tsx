import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CardAnimationProps {
  card: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}

export const CardAnimation = ({
  card,
  renderer,
  scene,
  camera,
}: CardAnimationProps) => {
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let lastTime = 0;
    const animate = (time: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (card) {
        card.rotation.y = Math.sin(time * 0.0005) * 0.2;
        card.position.y = 0.5 + Math.sin(time * 0.001) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate(0);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [card, renderer, scene, camera]);

  return null;
};
