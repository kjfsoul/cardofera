import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { toast } from "sonner";
const CardPreview3D = ({ imageUrl, text, enableSound = false, style = 'modern' }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const cardRef = useRef(null);
    const audioRef = useRef(null);
    useEffect(() => {
        if (!mountRef.current)
            return;
        // Scene setup with improved lighting
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);
        sceneRef.current = scene;
        // Camera setup with better positioning
        const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 4;
        camera.position.y = 0.5;
        cameraRef.current = camera;
        // Enhanced renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        // Improved lighting setup
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
        // Get card material based on style
        const getMaterialByStyle = (style) => {
            const baseMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.1,
                roughness: 0.2,
                reflectivity: 0.5,
                clearcoat: 0.3,
                clearcoatRoughness: 0.2,
                side: THREE.DoubleSide,
            });
            switch (style) {
                case 'classic':
                    baseMaterial.color = new THREE.Color(0xf5e6d3);
                    baseMaterial.metalness = 0.05;
                    baseMaterial.roughness = 0.4;
                    break;
                case 'playful':
                    baseMaterial.color = new THREE.Color(0xffffff);
                    baseMaterial.metalness = 0.2;
                    baseMaterial.roughness = 0.1;
                    baseMaterial.clearcoat = 0.5;
                    break;
                case 'elegant':
                    baseMaterial.color = new THREE.Color(0xf0f0f0);
                    baseMaterial.metalness = 0.3;
                    baseMaterial.roughness = 0.1;
                    baseMaterial.clearcoat = 0.8;
                    break;
                default: // modern
                    // Keep default values
                    break;
            }
            return baseMaterial;
        };
        // Enhanced card material
        const geometry = new THREE.BoxGeometry(3, 4, 0.1);
        const material = getMaterialByStyle(style);
        const card = new THREE.Mesh(geometry, material);
        card.castShadow = true;
        card.receiveShadow = true;
        card.position.y = 0.5;
        scene.add(card);
        cardRef.current = card;
        // Ground plane with better shadow
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.ShadowMaterial({
            opacity: 0.2,
            color: 0x000000,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.5;
        ground.receiveShadow = true;
        scene.add(ground);
        // Audio setup
        if (enableSound) {
            audioRef.current = new Audio("/card-open.mp3");
        }
        // Smooth animation loop
        let lastTime = 0;
        const animate = (time) => {
            requestAnimationFrame(animate);
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            if (cardRef.current) {
                cardRef.current.rotation.y = Math.sin(time * 0.0005) * 0.2;
                cardRef.current.position.y = 0.5 + Math.sin(time * 0.001) * 0.05;
            }
            renderer.render(scene, camera);
        };
        animate(0);
        // Responsive handling
        const handleResize = () => {
            if (!mountRef.current || !camera || !renderer)
                return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);
        // Interactive sound
        const handleInteraction = () => {
            if (enableSound && audioRef.current) {
                audioRef.current.play().catch(() => {
                    toast.error("Unable to play sound. Please check your browser settings.");
                });
            }
        };
        mountRef.current.addEventListener("click", handleInteraction);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current) {
                mountRef.current.removeEventListener("click", handleInteraction);
                mountRef.current.removeChild(renderer.domElement);
            }
            scene.clear();
        };
    }, [enableSound, style]);
    // Update texture when image changes
    useEffect(() => {
        if (!imageUrl || !cardRef.current)
            return;
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imageUrl, (texture) => {
            if (cardRef.current) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = 16;
                cardRef.current.material.map = texture;
                cardRef.current.material.needsUpdate = true;
            }
        }, undefined, (error) => {
            console.error("Error loading texture:", error);
            toast.error("Failed to load card image");
        });
    }, [imageUrl]);
    return (_jsx("div", { ref: mountRef, className: "w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl", role: "img", "aria-label": "3D card preview" }));
};
export default CardPreview3D;
