import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  affiliateLink: string;
}

const mockProducts: Product[] = [
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

const ProductShowcase = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    toast.success("Favorites updated!");
  };

  const handleShare = (product: Product) => {
    // TODO: Implement actual sharing functionality
    toast.success("Sharing options coming soon!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Recommended Gifts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-lg font-semibold">
                  <DollarSign className="h-4 w-4" />
                  {product.price}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={cn("h-4 w-4", {
                        "fill-current": favorites.includes(product.id),
                      })}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare(product)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => window.open(product.affiliateLink, "_blank")}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;