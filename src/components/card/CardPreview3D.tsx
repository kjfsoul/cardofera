import { useEffect, useRef } from "react";
import * as THREE from "three";
import { toast } from "sonner";

interface CardPreview3DProps {
  imageUrl?: string;
  text?: string;
  enableSound?: boolean;
}

const CardPreview3D = ({ imageUrl, text, enableSound = false }: CardPreview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cardRef = useRef<THREE.Mesh | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
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

    // Renderer setup with antialiasing and physically correct lighting
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      physicallyCorrectLights: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add soft fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Card geometry with better materials
    const geometry = new THREE.PlaneGeometry(4, 5.5); // Standard card ratio
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    
    const card = new THREE.Mesh(geometry, material);
    card.castShadow = true;
    card.receiveShadow = true;
    scene.add(card);
    cardRef.current = card;

    // Ground plane for shadow
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3;
    ground.receiveShadow = true;
    scene.add(ground);

    // Audio setup
    if (enableSound) {
      audioRef.current = new Audio("/card-open.mp3");
    }

    // Animation loop with smooth movement
    const animate = () => {
      requestAnimationFrame(animate);
      if (cardRef.current) {
        cardRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
        // Add subtle floating animation
        cardRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
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

    // Play sound on interaction if enabled
    const handleInteraction = () => {
      if (enableSound && audioRef.current) {
        audioRef.current.play().catch(() => {
          toast.error("Unable to play sound. Please check your browser settings.");
        });
      }
    };
    mountRef.current.addEventListener("click", handleInteraction);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener("click", handleInteraction);
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [enableSound]);

  // Update texture when image changes
  useEffect(() => {
    if (!imageUrl || !cardRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        if (cardRef.current) {
          // Adjust texture properties for better quality
          texture.encoding = THREE.sRGBEncoding;
          texture.anisotropy = 16;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).map = texture;
          (cardRef.current.material as THREE.MeshPhysicalMaterial).needsUpdate = true;
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
      className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl"
      role="img"
      aria-label="3D card preview"
    />
  );
};

export default CardPreview3D;