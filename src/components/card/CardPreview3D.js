import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThreeScene } from "./preview/useThreeScene";
import { LightingSetup } from "./preview/LightingSetup";
import { CardMesh } from "./preview/CardMesh";
import { CameraController } from "./preview/CameraController";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const CardPreview3D = ({ imageUrl, text, enableSound = false, style = "modern", textureUrl, }) => {
    const mountRef = useRef(null);
    const audioRef = useRef(null);
    const { sceneRef, cameraRef, rendererRef, cardRef } = useThreeScene(mountRef);
    const [isLoading, setIsLoading] = useState(false);
    const retryCountRef = useRef(0);
    const maxRetries = 3;
    const loadTexture = async (url, type = 'image') => {
        setIsLoading(true);
        const textureLoader = new THREE.TextureLoader();
        try {
            const texture = await new Promise((resolve, reject) => {
                textureLoader.load(url, (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.anisotropy = 16;
                    resolve(texture);
                }, undefined, (error) => {
                    console.error(`Error loading ${type}:`, error);
                    reject(error);
                });
            });
            if (cardRef.current) {
                const material = cardRef.current.material;
                if (type === 'image') {
                    material.map = texture;
                }
                else {
                    material.normalMap = texture;
                }
                material.needsUpdate = true;
            }
        }
        catch (error) {
            console.error(`Failed to load ${type}:`, error);
            if (retryCountRef.current < maxRetries) {
                retryCountRef.current++;
                await new Promise(resolve => setTimeout(resolve, 1000));
                await loadTexture(url, type);
            }
            else {
                if (type === 'texture') {
                    // Fallback to classic paper texture
                    toast.error("Failed to load texture, using classic paper instead");
                    await loadTexture('/textures/paper-classic.jpg', 'texture');
                }
                else {
                    toast.error(`Failed to load ${type}`);
                }
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (enableSound) {
            audioRef.current = new Audio("/card-open.mp3");
        }
    }, [enableSound]);
    useEffect(() => {
        if (imageUrl) {
            loadTexture(imageUrl, 'image');
        }
    }, [imageUrl]);
    useEffect(() => {
        if (textureUrl) {
            loadTexture(textureUrl, 'texture');
        }
    }, [textureUrl]);
    const handleInteraction = () => {
        if (enableSound && audioRef.current) {
            audioRef.current.play().catch(() => {
                toast.error("Unable to play sound. Please check your browser settings.");
            });
        }
    };
    return (_jsxs("div", { ref: mountRef, className: "relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-card shadow-xl", role: "img", "aria-label": "3D card preview", onClick: handleInteraction, children: [isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" }) })), sceneRef.current && (_jsxs(_Fragment, { children: [_jsx(LightingSetup, { scene: sceneRef.current, style: style }), cardRef.current && (_jsx(CardMesh, { scene: sceneRef.current, cardRef: cardRef, style: style, textureUrl: textureUrl })), cameraRef.current && rendererRef.current && (_jsx(CameraController, { camera: cameraRef.current, renderer: rendererRef.current }))] }))] }));
};
export default CardPreview3D;
