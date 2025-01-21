import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, DollarSign, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const mockProducts = [
    {
        id: "1",
        name: "Smart Watch Pro",
        description: "Latest generation smartwatch with health tracking features",
        price: 199.99,
        image: "/placeholder.svg",
        affiliateLink: "#",
    },
    {
        id: "2",
        name: "Wireless Earbuds",
        description: "Premium wireless earbuds with noise cancellation",
        price: 149.99,
        image: "/placeholder.svg",
        affiliateLink: "#",
    },
    {
        id: "3",
        name: "Digital Camera",
        description: "Professional-grade digital camera with 4K video",
        price: 599.99,
        image: "/placeholder.svg",
        affiliateLink: "#",
    },
];
const mockRecipients = [
    { id: "1", name: "Sarah Johnson", relationship: "Sister" },
    {
        id: "2",
        name: "Mike Smith",
        relationship: "Friend",
        avatar: "/placeholder.svg",
    },
    { id: "3", name: "Emma Davis", relationship: "Colleague" },
];
const ProductShowcase = () => {
    const [favorites, setFavorites] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [checkedProducts, setCheckedProducts] = useState([]);
    const toggleFavorite = (productId) => {
        setFavorites((prev) => prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]);
        toast.success("Favorites updated!");
    };
    const toggleProductCheck = (productId) => {
        setCheckedProducts((prev) => prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]);
        toast.success("Gift checklist updated!");
    };
    const handleShare = (product) => {
        toast.success("Sharing options coming soon!");
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Choose a Birthday Contact" }), _jsx("div", { className: "flex gap-4 overflow-x-auto pb-4", children: mockRecipients.map((recipient) => (_jsxs(Button, { variant: selectedRecipient === recipient.id ? "default" : "outline", className: "flex items-center gap-2 min-w-[200px] p-4", onClick: () => setSelectedRecipient(recipient.id), children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: recipient.avatar, alt: recipient.name }), _jsx(AvatarFallback, { children: recipient.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("") })] }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: recipient.name }), _jsx("div", { className: "text-sm text-muted-foreground", children: recipient.relationship })] })] }, recipient.id))) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: mockProducts.map((product) => (_jsxs(Card, { className: cn("overflow-hidden transition-all duration-300", {
                        "ring-2 ring-primary": checkedProducts.includes(product.id),
                    }), children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-full h-48 object-cover" }), _jsx(Button, { variant: "outline", size: "icon", className: "absolute top-2 right-2 bg-background/80 backdrop-blur-sm", onClick: () => toggleProductCheck(product.id), children: _jsx(Check, { className: cn("h-4 w-4", {
                                            "text-primary": checkedProducts.includes(product.id),
                                        }) }) })] }), _jsxs(CardContent, { className: "p-4 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: product.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: product.description })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center text-lg font-semibold", children: [_jsx(DollarSign, { className: "h-4 w-4" }), product.price] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => toggleFavorite(product.id), children: _jsx(Heart, { className: cn("h-4 w-4", {
                                                            "fill-current": favorites.includes(product.id),
                                                        }) }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => handleShare(product), children: _jsx(Share2, { className: "h-4 w-4" }) })] })] }), _jsx(Button, { className: "w-full", onClick: () => window.open(product.affiliateLink, "_blank"), children: "View Details" })] })] }, product.id))) })] }));
};
export default ProductShowcase;
