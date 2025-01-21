import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, DollarSign, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  affiliateLink: string;
}

interface Recipient {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
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

const mockRecipients: Recipient[] = [
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(
    null,
  );
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
    toast.success("Favorites updated!");
  };

  const toggleProductCheck = (productId: string) => {
    setCheckedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
    toast.success("Gift checklist updated!");
  };

  const handleShare = (product: Product) => {
    toast.success("Sharing options coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">Choose a Birthday Contact</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {mockRecipients.map((recipient) => (
            <Button
              key={recipient.id}
              variant={
                selectedRecipient === recipient.id ? "default" : "outline"
              }
              className="flex items-center gap-2 min-w-[200px] p-4"
              onClick={() => setSelectedRecipient(recipient.id)}
            >
              <Avatar>
                <AvatarImage src={recipient.avatar} alt={recipient.name} />
                <AvatarFallback>
                  {recipient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-medium">{recipient.name}</div>
                <div className="text-sm text-muted-foreground">
                  {recipient.relationship}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            className={cn("overflow-hidden transition-all duration-300", {
              "ring-2 ring-primary": checkedProducts.includes(product.id),
            })}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                onClick={() => toggleProductCheck(product.id)}
              >
                <Check
                  className={cn("h-4 w-4", {
                    "text-primary": checkedProducts.includes(product.id),
                  })}
                />
              </Button>
            </div>
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
