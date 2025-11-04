export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    category: "Seeds",
    price: 1200,
    brand: "Mahyco",
    description: "High-yield wheat variety, disease resistant, suitable for all soil types",
    image: "wheat-seeds"
  },
  {
    id: 2,
    name: "Hybrid Rice Seeds",
    category: "Seeds",
    price: 1500,
    brand: "IARI",
    description: "Hybrid rice seeds with excellent grain quality and high productivity",
    image: "rice-seeds"
  },
  {
    id: 3,
    name: "Cotton Seeds (BT)",
    category: "Seeds",
    price: 2200,
    brand: "Nuziveedu",
    description: "Bollworm resistant BT cotton seeds with superior fiber quality",
    image: "cotton-seeds"
  },
  {
    id: 4,
    name: "NPK Fertilizer (19:19:19)",
    category: "Fertilizers",
    price: 850,
    brand: "Coromandel",
    description: "Balanced NPK fertilizer for all crops, promotes healthy growth",
    image: "fertilizer"
  },
  {
    id: 5,
    name: "Organic Compost",
    category: "Fertilizers",
    price: 450,
    brand: "Sansar Agro",
    description: "100% organic compost enriched with micronutrients",
    image: "compost"
  },
  {
    id: 6,
    name: "Urea Fertilizer",
    category: "Fertilizers",
    price: 600,
    brand: "IFFCO",
    description: "High nitrogen content fertilizer for rapid plant growth",
    image: "urea"
  },
  {
    id: 7,
    name: "Insecticide Spray",
    category: "Pesticides",
    price: 320,
    brand: "UPL",
    description: "Broad spectrum insecticide for crop protection",
    image: "pesticide"
  },
  {
    id: 8,
    name: "Fungicide Solution",
    category: "Pesticides",
    price: 480,
    brand: "Bayer CropScience",
    description: "Systemic fungicide for disease prevention and control",
    image: "fungicide"
  },
  {
    id: 9,
    name: "Weedicide",
    category: "Pesticides",
    price: 550,
    brand: "Syngenta",
    description: "Post-emergence herbicide for weed control",
    image: "weedicide"
  },
  {
    id: 10,
    name: "Farming Tool Set",
    category: "Tools",
    price: 1800,
    brand: "Falcon",
    description: "Complete set of essential farming hand tools",
    image: "tools"
  },
  {
    id: 11,
    name: "Garden Spade",
    category: "Tools",
    price: 450,
    brand: "Pasco",
    description: "Heavy-duty steel spade with wooden handle",
    image: "spade"
  },
  {
    id: 12,
    name: "Pruning Shears",
    category: "Tools",
    price: 280,
    brand: "Ketsy",
    description: "Professional pruning shears for precise cutting",
    image: "pruning-shears"
  },
  {
    id: 13,
    name: "Drip Irrigation Kit",
    category: "Irrigation",
    price: 4500,
    brand: "Jain Irrigation",
    description: "Complete drip irrigation system for 1 acre",
    image: "drip-irrigation"
  },
  {
    id: 14,
    name: "Sprinkler System",
    category: "Irrigation",
    price: 3200,
    brand: "Netafim",
    description: "Water-efficient sprinkler irrigation system",
    image: "sprinkler"
  },
  {
    id: 15,
    name: "Water Pump",
    category: "Irrigation",
    price: 8500,
    brand: "Kirloskar",
    description: "Submersible water pump, 1HP, energy efficient",
    image: "water-pump"
  }
];

export const categories = ["All", "Seeds", "Fertilizers", "Pesticides", "Tools", "Irrigation"];
