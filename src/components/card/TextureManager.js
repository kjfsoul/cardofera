import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
const TextureManager = ({ onTextureSelect }) => {
    const [uploading, setUploading] = useState(false);
    const { data: textures, isLoading } = useQuery({
        queryKey: ["textures"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("card_textures")
                .select("*")
                .order("is_preset", { ascending: false });
            if (error)
                throw error;
            return data;
        },
    });
    const handleTextureUpload = async (event) => {
        try {
            const file = event.target.files?.[0];
            if (!file)
                return;
            // Validate file
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setUploading(true);
            // Upload to storage
            const fileExt = file.name.split(".").pop();
            const filePath = `${crypto.randomUUID()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from("card-textures")
                .upload(filePath, file);
            if (uploadError)
                throw uploadError;
            // Get public URL
            const { data: publicUrl } = supabase.storage
                .from("card-textures")
                .getPublicUrl(filePath);
            // Save to database
            const { error: dbError } = await supabase.from("card_textures").insert({
                name: file.name,
                description: "Custom texture",
                texture_url: publicUrl.publicUrl,
                is_preset: false,
            });
            if (dbError)
                throw dbError;
            toast.success("Texture uploaded successfully");
        }
        catch (error) {
            console.error("Error uploading texture:", error);
            toast.error("Failed to upload texture");
        }
        finally {
            setUploading(false);
        }
    };
    const handleTextureSelect = (textureUrl) => {
        onTextureSelect(textureUrl);
    };
    if (isLoading) {
        return _jsx("div", { children: "Loading textures..." });
    }
    return (_jsxs(Card, { className: "p-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Card Texture" }), _jsxs(Select, { onValueChange: handleTextureSelect, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choose a texture" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "none", children: "No texture" }), textures?.map((texture) => (_jsxs(SelectItem, { value: texture.texture_url, children: [texture.name, " ", texture.is_preset && "(Preset)"] }, texture.id)))] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Upload Custom Texture" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Button, { variant: "outline", className: "w-full", disabled: uploading, asChild: true, children: _jsxs("label", { children: [uploading ? "Uploading..." : "Upload Texture", _jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleTextureUpload, disabled: uploading })] }) }) })] })] }));
};
export default TextureManager;
