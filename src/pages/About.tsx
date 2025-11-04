import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About AgriMart</h1>
            <p className="text-lg text-muted-foreground">
              Empowering Indian farmers with technology and quality products
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  AgriMart is a comprehensive agricultural platform designed to support Indian farmers
                  in making informed decisions about crop selection and accessing quality farming supplies.
                  Our mission is to bridge the gap between traditional farming wisdom and modern
                  agricultural technology.
                </p>
                <p className="mb-4">
                  Through our intelligent crop recommendation system, farmers can receive personalized
                  suggestions based on their specific soil conditions, climate data, and available nutrients.
                  This helps maximize yield and profitability while ensuring sustainable farming practices.
                </p>
                <p>
                  Our marketplace connects farmers directly with India's most trusted agricultural brands,
                  offering premium seeds, fertilizers, pesticides, and farming equipment at competitive prices.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower Indian farmers with smart technology and reliable products
                  for sustainable and profitable agriculture
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serving thousands of farmers across India, building a community
                  of modern agricultural practitioners
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Our Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Committed to quality products, expert guidance, and
                  continuous innovation in agricultural technology
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Quality:</span>
                  <span className="text-muted-foreground">
                    We partner only with trusted brands to ensure the best products for our farmers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Innovation:</span>
                  <span className="text-muted-foreground">
                    Leveraging technology to provide smart, data-driven agricultural solutions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Sustainability:</span>
                  <span className="text-muted-foreground">
                    Promoting farming practices that protect our environment for future generations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Trust:</span>
                  <span className="text-muted-foreground">
                    Building lasting relationships with farmers through transparency and reliability
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
