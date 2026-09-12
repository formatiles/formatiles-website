export type ProductCategory = 'ceramic' | 'granite' | 'wall-panel' | 'spc';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  size: string; // e.g. "60x60", "60x120", "80x80", "18x122", "16x290"
  surfaceFinish: string; // e.g. "Polished", "Matte", "Rustic", "Fluted", "Wood Embossed"
  thicknessMm: number; // e.g. 9, 9.5, 10, 5, 21
  pcsPerBox: number; // e.g. 4, 2, 12
  coveragePerBoxM2: number; // e.g. 1.44, 2.196
  priceRange: string; // e.g. "Rp 185.000 - 240.000 / m²"
  startingPriceNumeric: number; // e.g. 185000 (for sorting)
  isFeatured: boolean;
  images: string[];
  specifications: Record<string, string>;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  commonSizes: string[];
  benefits: string[];
}

export interface BrandInfo {
  id: string;
  name: string;
  origin: string;
  specialty: string;
}

export interface InquiryItem {
  productId: string;
  productName: string;
  category: string;
  size: string;
  estimatedAreaM2: number;
  calculatedBoxes: number;
  note?: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  projectLocation?: string;
  items: InquiryItem[];
  totalAreaM2: number;
  message?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  source: 'calculator' | 'catalog' | 'direct';
  createdAt: string;
}

export interface CalculationInput {
  calcType: 'floor-wall' | 'spc' | 'wall-panel';
  lengthM: number;
  widthM: number;
  directAreaM2?: number;
  useDirectArea: boolean;
  tileSizePreset: string; // "60x60" | "60x120" | "80x80" | "30x60" | "custom"
  customTileLengthCm?: number;
  customTileWidthCm?: number;
  coveragePerBoxM2: number;
  pcsPerBox: number;
  wastePercent: number; // 5%, 10%, 15%
  approxPricePerM2?: number;
}

export interface CalculationOutput {
  netAreaM2: number;
  wasteAreaM2: number;
  totalAreaM2: number;
  boxesNeeded: number;
  actualCoverageM2: number;
  totalPieces: number;
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  breakdownSummary: string;
}
