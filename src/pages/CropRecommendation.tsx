import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recommendCrops, cropDatabase } from "@/data/cropRecommendation";
import { Sprout } from "lucide-react";
import wheatImg from "@/assets/crops/wheat.jpg";
import riceImg from "@/assets/crops/rice.jpg";
import sugarcaneImg from "@/assets/crops/sugarcane.jpg";
import cottonImg from "@/assets/crops/cotton.jpg";

const cropImages: Record<string, string> = {
  wheat: wheatImg,
  rice: riceImg,
  sugarcane: sugarcaneImg,
  cotton: cottonImg
};

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    soilType: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    pH: "",
    temperature: "",
    humidity: "",
    rainfall: ""
  });

  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      soilType: formData.soilType,
      nitrogen: parseFloat(formData.nitrogen),
      phosphorus: parseFloat(formData.phosphorus),
      potassium: parseFloat(formData.potassium),
      pH: parseFloat(formData.pH),
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      rainfall: parseFloat(formData.rainfall)
    };

    const results = recommendCrops(input);
    setRecommendations(results);
    setShowResults(true);
  };

  const handleReset = () => {
    setFormData({
      soilType: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      pH: "",
      temperature: "",
      humidity: "",
      rainfall: ""
    });
    setShowResults(false);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Sprout className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Crop Recommendation System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your farm's soil and climate data to get personalized crop recommendations
          </p>
        </div>

        {!showResults ? (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Enter Farm Details</CardTitle>
              <CardDescription>
                Provide accurate information for better recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => handleInputChange("soilType", value)}
                      required
                    >
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clay">Clay</SelectItem>
                        <SelectItem value="Loamy">Loamy</SelectItem>
                        <SelectItem value="Sandy">Sandy</SelectItem>
                        <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Alluvial">Alluvial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="nitrogen">Nitrogen (N) - kg/ha</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.nitrogen}
                      onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                      required
                      min="0"
                      max="200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phosphorus">Phosphorus (P) - kg/ha</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.phosphorus}
                      onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                      required
                      min="0"
                      max="200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="potassium">Potassium (K) - kg/ha</Label>
                    <Input
                      id="potassium"
                      type="number"
                      placeholder="e.g., 40"
                      value={formData.potassium}
                      onChange={(e) => handleInputChange("potassium", e.target.value)}
                      required
                      min="0"
                      max="200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pH">pH Level</Label>
                    <Input
                      id="pH"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 6.5"
                      value={formData.pH}
                      onChange={(e) => handleInputChange("pH", e.target.value)}
                      required
                      min="3"
                      max="10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., 28"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                      required
                      min="0"
                      max="50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 65"
                      value={formData.humidity}
                      onChange={(e) => handleInputChange("humidity", e.target.value)}
                      required
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rainfall">Rainfall (mm)</Label>
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.rainfall}
                      onChange={(e) => handleInputChange("rainfall", e.target.value)}
                      required
                      min="0"
                      max="500"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg">
                    Get Recommendations
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Recommended Crops for Your Farm</h2>
              <p className="text-muted-foreground mb-6">
                Based on your soil and climate conditions, here are the best crops to grow
              </p>
              <Button onClick={handleReset} variant="outline">
                Try Again
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((cropName) => {
                const crop = cropDatabase[cropName];
                return (
                  <Card key={cropName} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={cropImages[crop.image]}
                        alt={crop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{crop.name}</CardTitle>
                      <CardDescription>{crop.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p className="font-semibold mb-2">Ideal Conditions:</p>
                        <p className="text-muted-foreground">{crop.idealConditions}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
