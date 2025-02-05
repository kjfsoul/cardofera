import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "./useThreeScene";
import { LightingSetup } from "./LightingSetup";
import { CardMesh } from "./CardMesh";
import { CameraController } from "./CameraController";
import { toast } from "sonner";
const CardPreview3D = ({ imageUrl, text, enableSound = false, style = "modern", textureUrl, }) => {
    const mountRef = useRef(null);
    const audioRef = useRef(null);
    const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);
    useEffect(() => {
        if (enableSound) {
            audioRef.current = new Audio("/card-open.mp3");
        }
    }, [enableSound]);
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
    const handleInteraction = () => {
        if (enableSound && audioRef.current) {
            audioRef.current.play().catch(() => {
                toast.error("Unable to play sound. Please check your browser settings.");
            });
        }
    };
    return (_jsx("div", { ref: mountRef, className: "w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl", role: "img", "aria-label": "3D card preview", onClick: handleInteraction, children: sceneRef.current && (_jsxs(_Fragment, { children: [_jsx(LightingSetup, { scene: sceneRef.current, style: style }), cardRef.current && (_jsx(CardMesh, { scene: sceneRef.current, cardRef: cardRef, style: style, textureUrl: textureUrl })), cameraRef.current && rendererRef.current && (_jsx(CameraController, { camera: cameraRef.current, renderer: rendererRef.current }))] })) }));
};
export default CardPreview3D;
