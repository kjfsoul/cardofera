import { useEffect, useRef } from "react";
import * as THREE from "three";
import { toast } from "sonner";

interface CardPreview3DProps {
  imageUrl?: string;
  text?: string;
}

const CardPreview3D = ({ imageUrl, text }: CardPreview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cardRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Card geometry (as a flat plane)
    const geometry = new THREE.PlaneGeometry(3, 4); // Standard card ratio
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);
    cardRef.current = card;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (cardRef.current) {
        cardRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  // Update texture when image changes
  useEffect(() => {
    if (!imageUrl || !cardRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        if (cardRef.current) {
          (cardRef.current.material as THREE.MeshStandardMaterial).map = texture;
          (cardRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        toast.error("Failed to load card image");
      }
    );
  }, [imageUrl]);

  return (
    <div 
      ref={mountRef} 
      className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-border"
      role="img"
      aria-label="3D card preview"
    />
  );
};

export default CardPreview3D;