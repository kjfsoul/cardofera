import { useEffect, useRef } from "react";
export const CardAnimation = ({ card, renderer, scene, camera, }) => {
    const animationFrameRef = useRef();
    useEffect(() => {
        let lastTime = 0;
        const animate = (time) => {
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
