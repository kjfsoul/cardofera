import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface CardImageSearchProps {
  onImageSelect: (url: string) => void;
}

const CardImageSearch = ({ onImageSelect }: CardImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; url: string; title: string }>>([]);

  // Mockup search results - replace with actual API integration
  const mockImages = [
    {
      id: "dragon1",
      url: "https://images.unsplash.com/photo-1590005354167-6da97870c757",
      title: "Fantasy Dragon Artwork",
    },
    {
      id: "dragon2",
      url: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
      title: "Dragon Sculpture",
    },
    {
      id: "dragon3",
      url: "https://images.unsplash.com/photo-1548506446-86bfb3b8a168",
      title: "Dragon Mural",
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Mock search functionality
    const results = mockImages.filter(img => 
      img.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.info("No images found for your search");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for images (e.g., dragons)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardImageSearch;