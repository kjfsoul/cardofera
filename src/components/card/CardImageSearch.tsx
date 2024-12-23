import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CardImageSearchProps {
  onImageSelect: (url: string) => void;
}

const CardImageSearch = ({ onImageSelect }: CardImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; url: string; title: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Mock search functionality first
    const results = mockImages.filter(img => 
      img.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    
    // If no results found, generate an AI image
    if (results.length === 0) {
      await handleGenerateAIImage();
    }
  };

  const handleGenerateAIImage = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: searchQuery }
      });

      if (error) throw error;

      if (data.image) {
        setSearchResults([{
          id: 'ai-generated',
          url: data.image,
          title: `AI Generated: ${searchQuery}`
        }]);
        toast.success("AI image generated successfully!");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Mockup search results - keep for testing
  const mockImages = [
    {
      id: "birthday1",
      url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d",
      title: "Birthday Cake with Candles",
    },
    {
      id: "birthday2",
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
      title: "Colorful Birthday Decorations",
    },
    {
      id: "birthday3",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
      title: "Birthday Party Setup",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for images (e.g., birthday cake, candles)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isGenerating}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button onClick={handleGenerateAIImage} variant="secondary" disabled={isGenerating}>
          <Wand2 className="h-4 w-4 mr-2" />
          Generate
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {searchResults.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onImageSelect(image.url)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm rounded-b-lg">
              {image.title}
            </div>
          </div>
        ))}
      </div>

      {isGenerating && (
        <div className="text-center text-muted-foreground">
          Generating AI image... This may take a few moments.
        </div>
      )}
    </div>
  );
};

export default CardImageSearch;
