import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">AgriMart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Indian farmers with smart crop recommendations and quality agricultural products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/crop-recommendation" className="hover:text-primary transition-colors">
                  Crop Advisor
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AgriMart. Serving Indian Agriculture with Pride.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
