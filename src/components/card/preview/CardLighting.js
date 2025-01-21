import { useEffect } from "react";
import * as THREE from "three";
export const CardLighting = ({ scene, style = 'modern' }) => {
    useEffect(() => {
        const getLightingConfig = () => {
            switch (style) {
                case 'modern':
                    return {
                        ambient: { color: 0xffffff, intensity: 0.5 },
                        main: { color: 0xffffff, intensity: 1, position: [5, 5, 5] },
                        fill: { color: 0xffffff, intensity: 0.3, position: [-5, 0, 5] }
                    };
                case 'classic':
                    return {
                        ambient: { color: 0xfaf3e0, intensity: 0.6 },
                        main: { color: 0xfff8e1, intensity: 0.8, position: [4, 4, 4] },
                        fill: { color: 0xfff0c2, intensity: 0.4, position: [-4, 2, 4] }
                    };
                case 'playful':
                    return {
                        ambient: { color: 0xfff0f0, intensity: 0.7 },
                        main: { color: 0xffe0e0, intensity: 1.2, position: [6, 6, 6] },
                        fill: { color: 0xffd0d0, intensity: 0.5, position: [-6, 0, 6] }
                    };
                case 'elegant':
                    return {
                        ambient: { color: 0xf8f8f8, intensity: 0.4 },
                        main: { color: 0xffffff, intensity: 0.9, position: [5, 5, 5] },
                        fill: { color: 0xf0f0f0, intensity: 0.3, position: [-5, 1, 5] }
                    };
                default:
                    return {
                        ambient: { color: 0xffffff, intensity: 0.5 },
                        main: { color: 0xffffff, intensity: 1, position: [5, 5, 5] },
                        fill: { color: 0xffffff, intensity: 0.3, position: [-5, 0, 5] }
                    };
            }
        };
        const config = getLightingConfig();
        const ambientLight = new THREE.AmbientLight(config.ambient.color, config.ambient.intensity);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(config.main.color, config.main.intensity);
        mainLight.position.set(config.main.position[0], config.main.position[1], config.main.position[2]);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        scene.add(mainLight);
        const fillLight = new THREE.DirectionalLight(config.fill.color, config.fill.intensity);
        fillLight.position.set(config.fill.position[0], config.fill.position[1], config.fill.position[2]);
        scene.add(fillLight);
        return () => {
            scene.remove(ambientLight, mainLight, fillLight);
        };
    }, [scene]);
    return null;
};
