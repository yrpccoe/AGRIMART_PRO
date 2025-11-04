import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/products";
import { addToCart } from "@/utils/cart";
import { ShoppingCart, Search } from "lucide-react";
import { toast } from "sonner";
import wheatSeedsImg from "@/assets/products/wheat-seeds.jpg";
import riceSeedsImg from "@/assets/products/rice-seeds.jpg";
import cottonSeedsImg from "@/assets/products/cotton-seeds.jpg";
import fertilizerImg from "@/assets/products/fertilizer.jpg";
import compostImg from "@/assets/products/compost.jpg";
import ureaImg from "@/assets/products/urea.jpg";
import pesticideImg from "@/assets/products/pesticide.jpg";
import fungicideImg from "@/assets/products/fungicide.jpg";
import weedicideImg from "@/assets/products/weedicide.jpg";
import toolsImg from "@/assets/products/tools.jpg";
import spadeImg from "@/assets/products/spade.jpg";
import pruningShearsImg from "@/assets/products/pruning-shears.jpg";
import dripIrrigationImg from "@/assets/products/drip-irrigation.jpg";
import sprinklerImg from "@/assets/products/sprinkler.jpg";
import waterPumpImg from "@/assets/products/water-pump.jpg";

const productImages: Record<string, string> = {
  "wheat-seeds": wheatSeedsImg,
  "rice-seeds": riceSeedsImg,
  "cotton-seeds": cottonSeedsImg,
  "fertilizer": fertilizerImg,
  "compost": compostImg,
  "urea": ureaImg,
  "pesticide": pesticideImg,
  "fungicide": fungicideImg,
  "weedicide": weedicideImg,
  "tools": toolsImg,
  "spade": spadeImg,
  "pruning-shears": pruningShearsImg,
  "drip-irrigation": dripIrrigationImg,
  "sprinkler": sprinklerImg,
  "water-pump": waterPumpImg
};

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Agricultural Marketplace</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium farming products from India's most trusted brands
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <div className="h-48 overflow-hidden bg-muted">
                <img
                  src={productImages[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <span className="text-sm text-muted-foreground">{product.brand}</span>
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
