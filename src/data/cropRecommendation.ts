export interface CropData {
  name: string;
  image: string;
  description: string;
  idealConditions: string;
}

export const cropDatabase: Record<string, CropData> = {
  Rice: {
    name: "Rice",
    image: "rice",
    description: "India's staple food crop, requires high water availability and warm climate",
    idealConditions: "High rainfall, warm temperature, loamy soil rich in organic matter"
  },
  Wheat: {
    name: "Wheat",
    image: "wheat",
    description: "Major rabi crop, thrives in cooler temperatures with moderate rainfall",
    idealConditions: "Cool climate, moderate rainfall, well-drained loamy soil"
  },
  Sugarcane: {
    name: "Sugarcane",
    image: "sugarcane",
    description: "Commercial crop requiring abundant water and warm climate",
    idealConditions: "High temperature, heavy rainfall, deep fertile loamy soil"
  },
  Cotton: {
    name: "Cotton",
    image: "cotton",
    description: "Cash crop requiring warm climate and moderate rainfall",
    idealConditions: "Warm climate, moderate rainfall, black cotton soil"
  },
  Maize: {
    name: "Maize",
    image: "wheat",
    description: "Versatile kharif crop suitable for varied climatic conditions",
    idealConditions: "Moderate rainfall, warm temperature, well-drained soil"
  },
  Pulses: {
    name: "Pulses",
    image: "wheat",
    description: "Protein-rich crops including lentils, chickpeas, and beans",
    idealConditions: "Moderate rainfall, cool to warm climate, well-drained soil"
  },
  Groundnut: {
    name: "Groundnut",
    image: "wheat",
    description: "Oilseed crop preferring sandy loam soil",
    idealConditions: "Moderate rainfall, warm climate, sandy loam soil"
  },
  Jute: {
    name: "Jute",
    image: "wheat",
    description: "Fiber crop requiring high humidity and rainfall",
    idealConditions: "High rainfall, high humidity, alluvial soil"
  }
};

export interface RecommendationInput {
  soilType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export function recommendCrops(input: RecommendationInput): string[] {
  const recommendations: string[] = [];

  // Rice recommendations
  if (
    (input.soilType === "Loamy" || input.soilType === "Clay") &&
    input.rainfall > 100 &&
    input.temperature > 20 &&
    input.humidity > 60
  ) {
    recommendations.push("Rice");
  }

  // Wheat recommendations
  if (
    (input.soilType === "Loamy" || input.soilType === "Sandy Loam") &&
    input.temperature < 25 &&
    input.rainfall > 50 &&
    input.rainfall < 150 &&
    input.pH >= 6.0 &&
    input.pH <= 7.5
  ) {
    recommendations.push("Wheat");
  }

  // Sugarcane recommendations
  if (
    input.soilType === "Loamy" &&
    input.rainfall > 150 &&
    input.temperature > 25 &&
    input.nitrogen > 60
  ) {
    recommendations.push("Sugarcane");
  }

  // Cotton recommendations
  if (
    (input.soilType === "Black" || input.soilType === "Loamy") &&
    input.rainfall > 60 &&
    input.rainfall < 120 &&
    input.temperature > 20 &&
    input.pH >= 6.0 &&
    input.pH <= 8.0
  ) {
    recommendations.push("Cotton");
  }

  // Maize recommendations
  if (
    input.temperature > 15 &&
    input.temperature < 30 &&
    input.rainfall > 60 &&
    input.pH >= 5.5 &&
    input.pH <= 7.5
  ) {
    recommendations.push("Maize");
  }

  // Pulses recommendations
  if (
    (input.soilType === "Loamy" || input.soilType === "Sandy Loam") &&
    input.temperature < 30 &&
    input.rainfall > 40 &&
    input.rainfall < 100
  ) {
    recommendations.push("Pulses");
  }

  // Groundnut recommendations
  if (
    (input.soilType === "Sandy Loam" || input.soilType === "Sandy") &&
    input.rainfall > 50 &&
    input.rainfall < 125 &&
    input.temperature > 20 &&
    input.pH >= 6.0 &&
    input.pH <= 7.0
  ) {
    recommendations.push("Groundnut");
  }

  // Jute recommendations
  if (
    (input.soilType === "Loamy" || input.soilType === "Alluvial") &&
    input.rainfall > 150 &&
    input.humidity > 70 &&
    input.temperature > 24
  ) {
    recommendations.push("Jute");
  }

  // Return top 3 recommendations or fallback
  return recommendations.length > 0
    ? recommendations.slice(0, 3)
    : ["Maize", "Pulses", "Groundnut"];
}
