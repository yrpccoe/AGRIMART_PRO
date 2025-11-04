import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, isAuthenticated } from "@/utils/auth";
import { getCartCount } from "@/utils/cart";

const Navbar = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    const updateAuth = () => {
      const u = getCurrentUser();
      setUserEmail(u?.email ?? null);
    };

    updateCartCount();
  updateAuth();
  window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
  window.addEventListener("storage", updateAuth);
  window.addEventListener('kc_auth_changed', updateAuth);

    return () => {
  window.removeEventListener("storage", updateCartCount);
  window.removeEventListener("cart-updated", updateCartCount);
  window.removeEventListener("storage", updateAuth);
  window.removeEventListener('kc_auth_changed', updateAuth);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">AgriMart</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/crop-recommendation">
              <Button
                variant={isActive("/crop-recommendation") ? "default" : "ghost"}
                size="sm"
              >
                Crop Advisor
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                variant={isActive("/marketplace") ? "default" : "ghost"}
                size="sm"
              >
                Marketplace
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant={isActive("/about") ? "default" : "ghost"}
                size="sm"
              >
                About
              </Button>
            </Link>
          </div>

          <Link to="/cart">
            <Button variant={isActive("/cart") ? "default" : "outline"} size="sm" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <div className="ml-3">
            {!userEmail ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button size="sm" variant={isActive("/login") ? "default" : "ghost"}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">{userEmail}</span>
                <Button size="sm" variant="outline" onClick={() => { logout(); setUserEmail(null); }}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
