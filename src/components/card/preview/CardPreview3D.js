import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThreeScene } from "./useThreeScene";
import { CardLighting } from "./CardLighting";
import { CardMaterial } from "./CardMaterial";
import { CardAnimation } from "./CardAnimation";
import { toast } from "sonner";
const CardPreview3D = ({ imageUrl, text, enableSound = false, style = "modern", onError, }) => {
    const mountRef = useRef(null);
    const audioRef = useRef(null);
    const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);
    useEffect(() => {
        if (!sceneRef.current)
            return;
        const geometry = new THREE.BoxGeometry(3, 4, 0.1);
        const getMaterialProperties = () => {
            switch (style) {
                case "modern":
                    return {
                        color: 0xffffff,
                        metalness: 0.1,
                        roughness: 0.2,
                        reflectivity: 0.5,
                        clearcoat: 0.3,
                        clearcoatRoughness: 0.2,
                    };
                case "classic":
                    return {
                        color: 0xfaf3e0,
                        metalness: 0.05,
                        roughness: 0.3,
                        reflectivity: 0.4,
                        clearcoat: 0.2,
                        clearcoatRoughness: 0.3,
                    };
                case "playful":
                    return {
                        color: 0xff9a9e,
                        metalness: 0,
                        roughness: 0.4,
                        reflectivity: 0.3,
                        clearcoat: 0.1,
                        clearcoatRoughness: 0.4,
                    };
                case "elegant":
                    return {
                        color: 0xf8f8f8,
                        metalness: 0.15,
                        roughness: 0.15,
                        reflectivity: 0.6,
                        clearcoat: 0.4,
                        clearcoatRoughness: 0.15,
                    };
                default:
                    return {
                        color: 0xffffff,
                        metalness: 0.1,
                        roughness: 0.2,
                        reflectivity: 0.5,
                        clearcoat: 0.3,
                        clearcoatRoughness: 0.2,
                    };
            }
        };
        const material = new THREE.MeshPhysicalMaterial({
            ...getMaterialProperties(),
            side: THREE.DoubleSide,
        });
        const card = new THREE.Mesh(geometry, material);
        card.castShadow = true;
        card.receiveShadow = true;
        card.position.y = 0.5;
        sceneRef.current.add(card);
        cardRef.current = card;
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.ShadowMaterial({
            opacity: 0.2,
            color: 0x000000,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.5;
        ground.receiveShadow = true;
        sceneRef.current.add(ground);
        if (enableSound) {
            audioRef.current = new Audio("/card-open.mp3");
        }
        return () => {
            sceneRef.current?.remove(card, ground);
        };
    }, [enableSound]);
    useEffect(() => {
        const handleResize = () => {
            if (!mountRef.current || !cameraRef.current || !rendererRef.current)
                return;
            cameraRef.current.aspect =
                mountRef.current.clientWidth / mountRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleInteraction = () => {
        if (enableSound && audioRef.current) {
            audioRef.current.play().catch(() => {
                toast.error("Unable to play sound. Please check your browser settings.");
                onError?.();
            });
        }
    };
    return (_jsx("div", { ref: mountRef, className: "w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl", role: "img", "aria-label": "3D card preview", onClick: handleInteraction, children: sceneRef.current && (_jsxs(_Fragment, { children: [_jsx(CardLighting, { scene: sceneRef.current }), cardRef.current && (_jsx(CardMaterial, { mesh: cardRef.current, imageUrl: imageUrl, style: style })), cardRef.current &&
                    rendererRef.current &&
                    sceneRef.current &&
                    cameraRef.current && (_jsx(CardAnimation, { card: cardRef.current, renderer: rendererRef.current, scene: sceneRef.current, camera: cameraRef.current }))] })) }));
};
export default CardPreview3D;
