import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ShoppingBag, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Smart Agriculture for Better Tomorrow
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get personalized crop recommendations and access quality agricultural products for your farm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/crop-recommendation">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Sprout className="mr-2 h-5 w-5" />
                Get Crop Recommendations
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriMart?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Sprout className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Crop Recommendations</CardTitle>
                <CardDescription>
                  Get personalized crop suggestions based on your soil type, climate, and nutrients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our intelligent system analyzes your farm's conditions to recommend the best crops for maximum yield and profit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Quality Products</CardTitle>
                <CardDescription>
                  Access premium seeds, fertilizers, and farming equipment from trusted brands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Shop from leading Indian agricultural brands like Mahyco, UPL, Coromandel, and more at competitive prices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Trusted by Farmers</CardTitle>
                <CardDescription>
                  Join thousands of farmers who trust AgriMart for their agricultural needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We're committed to supporting Indian agriculture with reliable products and expert guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Farm?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our crop recommendation system to discover what grows best on your land
          </p>
          <Link to="/crop-recommendation">
            <Button size="lg">
              Start Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
