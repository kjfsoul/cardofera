import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface TextureData {
  id: string;
  name: string;
  description: string | null;
  texture_url: string;
  is_preset: boolean;
}

interface TextureManagerProps {
  onTextureSelect: (textureUrl: string) => void;
}

const TextureManager = ({ onTextureSelect }: TextureManagerProps) => {
  const [uploading, setUploading] = useState(false);

  const { data: textures, isLoading } = useQuery({
    queryKey: ["textures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_textures")
        .select("*")
        .order("is_preset", { ascending: false });

      if (error) throw error;
      return data as TextureData[];
    },
  });

  const handleTextureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

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

      if (uploadError) throw uploadError;

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

      if (dbError) throw dbError;

      toast.success("Texture uploaded successfully");
    } catch (error) {
      console.error("Error uploading texture:", error);
      toast.error("Failed to upload texture");
    } finally {
      setUploading(false);
    }
  };

  const handleTextureSelect = (textureUrl: string) => {
    onTextureSelect(textureUrl);
  };

  if (isLoading) {
    return <div>Loading textures...</div>;
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Card Texture</Label>
        <Select onValueChange={handleTextureSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a texture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No texture</SelectItem>
            {textures?.map((texture) => (
              <SelectItem key={texture.id} value={texture.texture_url}>
                {texture.name} {texture.is_preset && "(Preset)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Upload Custom Texture</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="w-full"
            disabled={uploading}
            asChild
          >
            <label>
              {uploading ? "Uploading..." : "Upload Texture"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleTextureUpload}
                disabled={uploading}
              />
            </label>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TextureManager;