import { useEffect } from "react";
export const CameraController = ({ camera, renderer }) => {
    useEffect(() => {
        // Set initial camera position
        camera.position.z = 4;
        camera.position.y = 0.5;
        // Handle window resize
        const handleResize = () => {
            const container = renderer.domElement.parentElement;
            if (!container)
                return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [camera, renderer]);
    return null;
};
