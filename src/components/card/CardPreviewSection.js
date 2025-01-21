import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CardPreview3D from '@/components/3d/CardPreview3D';
import { CardDownloadShare } from '@/components/shared/CardDownloadShare';
const CardPreviewSection = ({ cardMessage, isSoundEnabled, cardStyle, imageUrl }) => {
    const handleRenderError = () => {
        console.error('Render error occurred');
    };
    return (_jsxs("div", { className: "preview-section", children: [_jsx(CardPreview3D, { imageUrl: imageUrl, text: cardMessage, enableSound: isSoundEnabled, style: cardStyle }, imageUrl), _jsx(CardDownloadShare, {})] }));
};
export default CardPreviewSection;
