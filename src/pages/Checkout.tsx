import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCart, getCartTotal, clearCart, CartItem } from "@/utils/cart";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      navigate("/cart");
    }
    setCartItems(items);
  }, [navigate]);

  const total = getCartTotal();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      window.dispatchEvent(new Event("cart-updated"));
      toast.success("Order placed successfully!");

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <CheckCircle2 className="h-24 w-24 text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground mb-2">
                Thank you for your order
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Your order has been successfully placed and will be delivered soon
              </p>
              <p className="text-2xl font-bold text-primary mb-8">
                Order Total: ₹{total.toLocaleString()}
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        required
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="6-digit pincode"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : "Place Order (Mock Payment)"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
