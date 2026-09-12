import { Product, CategoryInfo, BrandInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'granite',
    name: 'Granite & Porcelain Slabs',
    tagline: 'Swiss-heritage homogeneous porcelain and grand format sintered stone',
    description: 'Engineered large-format glazed porcelain and homogeneous granite slabs from Niro Granite featuring bookmatch marble veining, Slip Stop anti-slip technology, and diamond-polished finishes for luxury spaces.',
    image: '/images/products/niro-granite-conti-flow-60x120-room.jpg',
    commonSizes: ['60x120', '80x80', '60x60', '30x60', '15x90'],
    benefits: ['Ultra-low water absorption (<0.05%)', 'Patented Slip Stop technology', 'Continuous veining bookmatch options']
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Gres Floor Tiles',
    tagline: 'Single-fired Gres Technology for enduring architectural flooring',
    description: 'Premier floor ceramics and high-strength single-fired Gres tiles from Roman Ceramics. High flexural strength, rich stone and wood textures, designed for residential, commercial, and wet areas.',
    image: '/images/products/roman-ceramics-carrara-50x50-room.jpg',
    commonSizes: ['50x50', '40x40', '30x30', '20x20'],
    benefits: ['Single-fired Gres high structural density', 'Resistant to stains & chemical agents', 'Anti-slip R10/R11 exterior surfaces']
  }
];

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'niro-granite',
    name: 'Niro Granite',
    origin: 'Switzerland / Indonesia (PT Niro Ceramic)',
    specialty: 'Homogeneous porcelain tiles, glazed granite slabs & architectural surfaces'
  },
  {
    id: 'roman-ceramics',
    name: 'Roman Ceramics',
    origin: 'Indonesia (PT Roman Ceramic International / Lyman Group)',
    specialty: 'Single-fired Gres technology floor tiles & architectural ceramics'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // NIRO GRANITE COLLECTIONS (Granite / Porcelain)
  // ==========================================
  {
    id: 'niro-conti-flow-60x120',
    slug: 'niro-granite-conti-flow-60x120',
    name: 'Niro Granite Conti-Flow (GLZ01 Statuario Flow)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x120',
    surfaceFinish: 'Polished Mirror Gloss',
    thicknessMm: 11.3,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 275.000 - 340.000 / m²',
    startingPriceNumeric: 275000,
    isFeatured: true,
    images: [
      '/images/products/niro-granite-conti-flow-60x120-room.jpg',
      '/images/products/niro-granite-conti-flow-60x120-tile.jpg',
      '/images/products/niro-granite-conti-flow-60x120-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Conti-Flow (GLZ01 Statuario Flow)',
      'Water Absorption': '< 0.05% (ISO 10545-3 Homogeneous)',
      'Number of Faces': 'Continuous Vein Matching (Non-Fixed)',
      'Working Size': '600 x 1200 mm',
      'Edge': 'Precision Rectified',
      'Box Weight': 'approx. 38.0 kg',
      'Application': 'Living Room, Lobby, Feature Wall, Master Suite'
    },
    description: 'From Niro Granite 2025 Collection. Conti-Flow features continuous marble veining engineered to create an uninterrupted flow across large floors and feature walls, recreating the grandeur of bookmatched Italian Statuario marble.'
  },
  {
    id: 'niro-continueza-80x80',
    slug: 'niro-granite-continueza-80x80',
    name: 'Niro Granite Continueza (GCN01 Calacatta Gold)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '80x80',
    surfaceFinish: 'Polished Glass Finish',
    thicknessMm: 11.0,
    pcsPerBox: 3,
    coveragePerBoxM2: 1.92,
    priceRange: 'Rp 295.000 - 365.000 / m²',
    startingPriceNumeric: 295000,
    isFeatured: true,
    images: [
      '/images/products/niro-granite-continueza-80x80-room.jpg',
      '/images/products/niro-granite-continueza-80x80-tile.jpg',
      '/images/products/niro-granite-continueza-80x80-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Continueza (GCN01)',
      'Working Size': '800 x 800 mm',
      'Water Absorption': '< 0.05%',
      'Shade Variation': 'V2 (Slightly noticeable)',
      'Number of Faces': '4 Continuous Flow Faces',
      'Box Weight': 'approx. 44.5 kg',
      'Application': 'Executive Living Rooms, Penthouse Foyers, Commercial Showrooms'
    },
    description: 'Niro Granite Continueza in 80x80cm grand format. Crafted with four interconnecting faces that align seamlessly to expand room perspectives with warm gold and amber marble striations.'
  },
  {
    id: 'niro-marmogio-60x120',
    slug: 'niro-granite-marmogio-60x120',
    name: 'Niro Granite Marmogio (GIO02 Bianco)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x120',
    surfaceFinish: 'Polished Mirror',
    thicknessMm: 11.3,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 260.000 - 320.000 / m²',
    startingPriceNumeric: 260000,
    isFeatured: true,
    images: [
      '/images/products/niro-granite-marmogio-60x120-room.jpg',
      '/images/products/niro-granite-marmogio-60x120-tile.jpg',
      '/images/products/niro-granite-marmogio-60x120-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Marmogio (GIO02 Bianco / GIO03 Grigio)',
      'Working Size': '600 x 1200 mm',
      'Number of Faces': '10 Distinct Architectural Faces',
      'Water Absorption': '< 0.05%',
      'Edge': 'Precision Rectified',
      'Application': 'Bathroom Walls, Master Flooring, Kitchen Islands'
    },
    description: 'A tribute to Italian quarried marble. Marmogio blends crisp grey feathering across a translucent porcelain body with 10 graphic faces for natural authenticity without pattern repetition.'
  },
  {
    id: 'niro-havana-80x80',
    slug: 'niro-granite-havana-80x80',
    name: 'Niro Granite Havana (GHV01 Blanco)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '80x80',
    surfaceFinish: 'Polished Double Layer',
    thicknessMm: 11.0,
    pcsPerBox: 3,
    coveragePerBoxM2: 1.92,
    priceRange: 'Rp 280.000 - 350.000 / m²',
    startingPriceNumeric: 280000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-havana-80x80-room.jpg',
      '/images/products/niro-granite-havana-80x80-tile.jpg',
      '/images/products/niro-granite-havana-80x80-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Havana (GHV01)',
      'Body Structure': 'Double Layer Heavy Porcelain',
      'Working Size': '800 x 800 mm',
      'Shade Variation': 'V3 (Moderately noticeable)',
      'Number of Faces': 'Non-Fixed Dynamic Faces',
      'Application': 'High Traffic Commercial, Luxury Residences'
    },
    description: 'Double-layer pressed porcelain with polished finish. Havana brings timeless dignity to modern interiors with enhanced surface density that withstands demanding foot traffic.'
  },
  {
    id: 'niro-serena-2025-60x120',
    slug: 'niro-granite-serena-2025-60x120',
    name: 'Niro Granite Serena (New 2025 Collection)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x120',
    surfaceFinish: 'Slip Stop Matt (R10 Safety)',
    thicknessMm: 11.3,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 265.000 - 325.000 / m²',
    startingPriceNumeric: 265000,
    isFeatured: true,
    images: [
      '/images/products/niro-granite-serena-2025-60x120-room.jpg',
      '/images/products/niro-granite-serena-2025-60x120-tile.jpg',
      '/images/products/niro-granite-serena-2025-60x120-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Serena (New 2025)',
      'Technology': 'Patented Slip Stop Surface (Smooth dry, high-friction wet)',
      'Working Size': '600 x 1200 mm',
      'Faces': '8 Dynamic Faces',
      'Slip Rating': 'R10 Certified',
      'Application': 'Bathrooms, Pool Decks, Wet Kitchens, Balconies'
    },
    description: 'Featured in the Niro Granite 2025 Regular Catalog. Serena incorporates the pioneering Slip Stop Surface technology that feels velvety-smooth when dry yet activates high traction when wet.'
  },
  {
    id: 'niro-unique-travertine-60x120',
    slug: 'niro-granite-unique-travertine-60x120',
    name: 'Niro Granite Unique Travertine (GTX01)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x120',
    surfaceFinish: 'Honed Satin Vein Cut',
    thicknessMm: 11.5,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 285.000 - 355.000 / m²',
    startingPriceNumeric: 285000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-unique-travertine-60x120-room.jpg',
      '/images/products/niro-granite-unique-travertine-60x120-tile.jpg',
      '/images/products/niro-granite-unique-travertine-60x120-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Unique Travertine (GTX01 Romano / GTX07 Silver)',
      'Working Size': '600 x 1200 mm',
      'Texture': 'Cross-cut Roman travertine linear porosity',
      'Water Absorption': '< 0.05%',
      'Application': 'Minimalist Japandi Interiors, Bathrooms, Façade Claddings'
    },
    description: 'Authentic Roman travertine recreation. Captures directional sedimentation striations with honed velvety touch without the maintenance or porosity of raw stone.'
  },
  {
    id: 'niro-cimento-60x120',
    slug: 'niro-granite-cimento-60x120',
    name: 'Niro Granite Cimento (GCM01 Light Grey)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x120',
    surfaceFinish: 'Architectural Matt Cement',
    thicknessMm: 11.3,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 245.000 - 305.000 / m²',
    startingPriceNumeric: 245000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-cimento-60x120-room.jpg',
      '/images/products/niro-granite-cimento-60x120-tile.jpg',
      '/images/products/niro-granite-cimento-60x120-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Cimento (GCM01 / GCM02)',
      'Texture': 'Industrial Cast-In-Place Concrete Formwork',
      'Working Size': '600 x 1200 mm',
      'P-Rating': 'P2 Architectural Grade',
      'Faces': 'Non-Fixed Natural Faces',
      'Application': 'Industrial Lofts, Cafes, Contemporary Open Plans'
    },
    description: 'Minimalist exposed concrete aesthetic. Subtle trowel marks and curing clouds evoke modern brutalist architecture while providing unyielding porcelain stain resistance.'
  },
  {
    id: 'niro-terrazzo-60x60',
    slug: 'niro-granite-terrazzo-60x60',
    name: 'Niro Granite Terrazzo (GTR01 Bianco)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x60',
    surfaceFinish: 'Matte Honed Aggregate',
    thicknessMm: 9.8,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 225.000 - 285.000 / m²',
    startingPriceNumeric: 225000,
    isFeatured: true,
    images: [
      '/images/products/niro-granite-terrazzo-60x60-room.jpg',
      '/images/products/niro-granite-terrazzo-60x60-tile.jpg',
      '/images/products/niro-granite-terrazzo-60x60-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Terrazzo (GTR01 Bianco / GTR02 Grigio)',
      'Working Size': '600 x 600 mm',
      'Aggregate Type': 'Venetian Marble Chip Inlay Look',
      'P-Rating': 'P2 Surface',
      'Box Weight': 'approx. 30.5 kg',
      'Application': 'Boutiques, Cafes, Residential Terraces, Bathrooms'
    },
    description: 'Inspired by the historic terrazzo pavements of Venice. Balanced aggregate distribution creates a tactile, energetic surface that disguises everyday dust and wears beautifully.'
  },
  {
    id: 'niro-finewood-15x90',
    slug: 'niro-granite-finewood-15x90',
    name: 'Niro Granite Finewood (GFW01 Nordic Oak)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '15x90',
    surfaceFinish: 'Textured Wood Grain Matt',
    thicknessMm: 10.0,
    pcsPerBox: 8,
    coveragePerBoxM2: 1.08,
    priceRange: 'Rp 220.000 - 275.000 / m²',
    startingPriceNumeric: 220000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-finewood-15x90-room.jpg',
      '/images/products/niro-granite-finewood-15x90-tile.jpg',
      '/images/products/niro-granite-finewood-15x90-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Finewood (GFW01 / GFW02)',
      'Working Size': '150 x 900 mm Plank',
      'Number of Faces': 'Non-Fixed Natural Timber Graphics',
      'P-Rating': 'P3 Slip Resistance',
      'Box Weight': 'approx. 24.0 kg',
      'Application': 'Bedrooms, Living Rooms, Semi-Outdoor Terraces'
    },
    description: 'Porcelain timber planks with authentic tactile wood grain. 100% water and termite proof, delivering Scandinavian warmth with zero upkeep or waxing needed.'
  },
  {
    id: 'niro-nuswapada-60x60',
    slug: 'niro-granite-nuswapada-60x60',
    name: 'Niro Granite Nuswapada (GNP01 Batik Kembang Waru)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x60',
    surfaceFinish: 'Architectural Satin Matt',
    thicknessMm: 9.8,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 240.000 - 310.000 / m²',
    startingPriceNumeric: 240000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-nuswapada-60x60-room.jpg',
      '/images/products/niro-granite-nuswapada-60x60-tile.jpg',
      '/images/products/niro-granite-nuswapada-60x60-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Thematic Nuswapada (GNP01 / GNP05 Kawung Mlinjon)',
      'Cultural Origin': 'Traditional Indonesian Batik Heritage Geometry',
      'Working Size': '600 x 600 mm',
      'P-Rating': 'P2',
      'Application': 'Foyer Statement Floor, Powder Room Accent, Resort Terraces'
    },
    description: 'A celebration of Indonesian cultural heritage. Authentic batik motifs reinterpreted through Swiss porcelain precision, creating unforgettable ornamental floors and partitions.'
  },
  {
    id: 'niro-polar-black-60x60',
    slug: 'niro-granite-polar-black-60x60',
    name: 'Niro Granite Polar Black (GPB01)',
    category: 'granite',
    brand: 'Niro Granite',
    size: '60x60',
    surfaceFinish: 'Polished Obsidian Gloss',
    thicknessMm: 9.8,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 235.000 - 295.000 / m²',
    startingPriceNumeric: 235000,
    isFeatured: false,
    images: [
      '/images/products/niro-granite-polar-black-60x60-room.jpg',
      '/images/products/niro-granite-polar-black-60x60-tile.jpg',
      '/images/products/niro-granite-polar-black-60x60-catalog.jpg'
    ],
    specifications: {
      'Catalog Series': 'Polar Black (GPB01)',
      'Color Profile': 'Absolute Monolithic Obsidian Black',
      'Working Size': '600 x 600 mm',
      'P-Rating': 'P4 Heavy Commercial',
      'Application': 'Executive Boardrooms, Luxury Restrooms, Retail Foyers'
    },
    description: 'Deep obsidian monolithic black porcelain. Precision polished surface creates mirror-like light play, ideal for contrasting with warm timber or white Carrara accents.'
  },

  // ==========================================
  // ROMAN CERAMICS COLLECTIONS (Ceramic / Gres)
  // ==========================================
  {
    id: 'roman-carrara-50x50',
    slug: 'roman-ceramics-carrara-50x50',
    name: 'Roman Ceramics Carrara (G550001)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '50x50',
    surfaceFinish: 'Glossy Mirror Gres',
    thicknessMm: 9.0,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 115.000 - 145.000 / m²',
    startingPriceNumeric: 115000,
    isFeatured: true,
    images: [
      '/images/products/roman-ceramics-carrara-50x50-room.jpg',
      '/images/products/roman-ceramics-carrara-50x50-tile.jpg',
      '/images/products/roman-ceramics-carrara-50x50-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G550001 - Gol. A',
      'Manufacturing': 'Single-Fired Gres Technology (RCI Factory)',
      'Water Absorption': '< 3.0% (Group B1b ISO 10545-3)',
      'Modulus of Rupture': '>= 35 N/mm² (High Flexural Strength)',
      'Pcs / Box': '4 pcs (1.00 m²)',
      'Box Weight': 'approx. 20.5 kg',
      'Application': 'Living Rooms, Dining Halls, Hallways, Bedrooms'
    },
    description: 'From Roman Floor Tile Catalog. Iconic Carrara marble aesthetics crafted with Roman single-fired Gres Technology. Fired at ultra-high temperatures for high flexural strength and long-lasting gloss.'
  },
  {
    id: 'roman-colosseum-50x50',
    slug: 'roman-ceramics-colosseum-50x50',
    name: 'Roman Ceramics Colosseum (G550004)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '50x50',
    surfaceFinish: 'Matte Architectural Gres',
    thicknessMm: 9.0,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 110.000 - 140.000 / m²',
    startingPriceNumeric: 110000,
    isFeatured: false,
    images: [
      '/images/products/roman-ceramics-colosseum-50x50-room.jpg',
      '/images/products/roman-ceramics-colosseum-50x50-tile.jpg',
      '/images/products/roman-ceramics-colosseum-50x50-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G550004 - Gol. A',
      'Technology': 'Single-Fired Gres Technology',
      'Finish': 'Natural Matte Stone',
      'Pcs / Box': '4 pcs (1.00 m²)',
      'Box Weight': '20.5 kg',
      'Application': 'Family Rooms, Terraces, Commercial Spaces'
    },
    description: 'Inspired by the monumental Roman amphitheater stones. Colosseum offers a calm beige-sand texture with natural slip resistance and dependable surface durability.'
  },
  {
    id: 'roman-dbudapest-50x50',
    slug: 'roman-ceramics-dbudapest-50x50',
    name: 'Roman Ceramics dBudapest (G550012 Grigio)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '50x50',
    surfaceFinish: 'Matte Multi-Face Stone',
    thicknessMm: 9.0,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 115.000 - 145.000 / m²',
    startingPriceNumeric: 115000,
    isFeatured: true,
    images: [
      '/images/products/roman-ceramics-dbudapest-50x50-room.jpg',
      '/images/products/roman-ceramics-dbudapest-50x50-tile.jpg',
      '/images/products/roman-ceramics-dbudapest-50x50-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G550012 Grigio / G550013 - Gol. A',
      'Design Feature': 'Wide Variety Design within 1 Box (up to 15 faces)',
      'Technology': 'Single-Fired Gres Technology',
      'Pcs / Box': '4 pcs (1.00 m²)',
      'Box Weight': '20.5 kg',
      'Application': 'Contemporary Homes, Cafes, Balconies'
    },
    description: 'European architectural stone look with up to 15 natural graphic faces in every box. Eliminates repetitive patterns and delivers rich visual depth for modern floors.'
  },
  {
    id: 'roman-dtimber-50x50',
    slug: 'roman-ceramics-dtimber-50x50',
    name: 'Roman Ceramics dTimber (G550701 Natural)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '50x50',
    surfaceFinish: 'Textured Timber Parquet',
    thicknessMm: 9.0,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 120.000 - 150.000 / m²',
    startingPriceNumeric: 120000,
    isFeatured: false,
    images: [
      '/images/products/roman-ceramics-dtimber-50x50-room.jpg',
      '/images/products/roman-ceramics-dtimber-50x50-tile.jpg',
      '/images/products/roman-ceramics-dtimber-50x50-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G550701 - Gol. B',
      'Design': 'Warm Teak Parquet Arrangement',
      'Technology': 'Single-Fired Gres Technology',
      'Pcs / Box': '4 pcs (1.00 m²)',
      'Box Weight': '20.5 kg',
      'Application': 'Bedrooms, Family Lounges, Covered Patios'
    },
    description: 'Natural warmth of real timber parquet combined with the toughness of gres ceramic. Fireproof, water-resistant, and immune to wood termites and tropical humidity.'
  },
  {
    id: 'roman-dcastrum-40x40',
    slug: 'roman-ceramics-dcastrum-40x40',
    name: 'Roman Ceramics dCastrum (G440101 Rustic)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '40x40',
    surfaceFinish: 'Rustic Structured Stone',
    thicknessMm: 8.5,
    pcsPerBox: 6,
    coveragePerBoxM2: 0.96,
    priceRange: 'Rp 95.000 - 125.000 / m²',
    startingPriceNumeric: 95000,
    isFeatured: true,
    images: [
      '/images/products/roman-ceramics-dcastrum-40x40-room.jpg',
      '/images/products/roman-ceramics-dcastrum-40x40-tile.jpg',
      '/images/products/roman-ceramics-dcastrum-40x40-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G440101 - Gol. B',
      'Working Size': '400 x 400 mm',
      'Finish': 'Chiseled Weathered Edge Structured',
      'Pcs / Box': '6 pcs (0.96 m²)',
      'Box Weight': 'approx. 17.0 kg',
      'Application': 'Outdoor Terraces, Carports, Villa Courtyards'
    },
    description: 'Antique Mediterranean fortress stone texture. dCastrum features organic weathered edges and a structured anti-slip relief, ideal for tropical carports, gardens, and terraces.'
  },
  {
    id: 'roman-dlaterina-40x40',
    slug: 'roman-ceramics-dlaterina-40x40',
    name: 'Roman Ceramics dLaterina (G449556 Bone / Beige)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '40x40',
    surfaceFinish: 'Glossy Noble Vein',
    thicknessMm: 8.5,
    pcsPerBox: 6,
    coveragePerBoxM2: 0.96,
    priceRange: 'Rp 98.000 - 128.000 / m²',
    startingPriceNumeric: 98000,
    isFeatured: false,
    images: [
      '/images/products/roman-ceramics-dlaterina-40x40-room.jpg',
      '/images/products/roman-ceramics-dlaterina-40x40-tile.jpg',
      '/images/products/roman-ceramics-dlaterina-40x40-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G449556 Bone / G449557 Beige - Gol. B',
      'Finish': 'Noble Glossy Mirror Finish',
      'Pcs / Box': '6 pcs (0.96 m²)',
      'Box Weight': '17.0 kg',
      'Application': 'Bathrooms, Hallways, Residential Interiors'
    },
    description: 'Noble classic marble veins in warm bone and beige hues. High reflectivity makes compact 40x40 rooms appear brighter and more spacious.'
  },
  {
    id: 'roman-dbolonia-30x30',
    slug: 'roman-ceramics-dbolonia-30x30',
    name: 'Roman Ceramics dBolonia (G337504 Bone)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '30x30',
    surfaceFinish: 'Matte Earth Hues',
    thicknessMm: 8.0,
    pcsPerBox: 11,
    coveragePerBoxM2: 0.99,
    priceRange: 'Rp 85.000 - 110.000 / m²',
    startingPriceNumeric: 85000,
    isFeatured: false,
    images: [
      '/images/products/roman-ceramics-dbolonia-30x30-room.jpg',
      '/images/products/roman-ceramics-dbolonia-30x30-tile.jpg',
      '/images/products/roman-ceramics-dbolonia-30x30-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G337504 Bone / G337505 Beige / G337507 Grey - Gol. B',
      'Working Size': '300 x 300 mm',
      'Pcs / Box': '11 pcs (0.99 m²)',
      'Box Weight': 'approx. 15.5 kg',
      'Application': 'Bathrooms, Service Areas, Laundry Balconies'
    },
    description: 'Gentle, soothing natural stone tones. dBolonia provides dependable wet-area traction and comfortable underfoot texture for bathrooms, kitchens, and service areas.'
  },
  {
    id: 'roman-dbatur-30x30',
    slug: 'roman-ceramics-dbatur-30x30',
    name: 'Roman Ceramics dBatur (G330511 Grigio / Charcoal)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '30x30',
    surfaceFinish: 'Structured Volcanic Lava Stone',
    thicknessMm: 8.0,
    pcsPerBox: 11,
    coveragePerBoxM2: 0.99,
    priceRange: 'Rp 88.000 - 115.000 / m²',
    startingPriceNumeric: 88000,
    isFeatured: true,
    images: [
      '/images/products/roman-ceramics-dbatur-30x30-room.jpg',
      '/images/products/roman-ceramics-dbatur-30x30-tile.jpg',
      '/images/products/roman-ceramics-dbatur-30x30-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G330510 Perla / G330511 Grigio / G330513 Charcoal - Gol. B',
      'Design Theme': 'Authentic Balinese Volcanic Basalt Texture',
      'Finish': 'Heavy Relief Structured (Anti-Slip R11)',
      'Pcs / Box': '11 pcs (0.99 m²)',
      'Box Weight': '15.5 kg',
      'Application': 'Carports, Garden Walkways, Pool Surrounds, Garages'
    },
    description: 'Authentic touch of Indonesian volcanic stone. Engineered with high-friction relief that provides superior vehicle and pedestrian traction even during heavy rainfall.'
  },
  {
    id: 'roman-oceanus-20x20',
    slug: 'roman-ceramics-oceanus-20x20',
    name: 'Roman Ceramics Oceanus (G229001 Marine)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '20x20',
    surfaceFinish: 'Glossy Crystal Blue Glaze',
    thicknessMm: 7.5,
    pcsPerBox: 25,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 135.000 - 175.000 / m²',
    startingPriceNumeric: 135000,
    isFeatured: true,
    images: [
      '/images/products/roman-ceramics-oceanus-20x20-room.jpg',
      '/images/products/roman-ceramics-oceanus-20x20-tile.jpg',
      '/images/products/roman-ceramics-oceanus-20x20-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G229001 Marine / G229002 Sky / G229000 Blue - Gol. D',
      'Working Size': '200 x 200 mm',
      'Water Absorption': 'Impervious Pool-Grade Gres',
      'Pcs / Box': '25 pcs (1.00 m²)',
      'Box Weight': 'approx. 15.6 kg',
      'Application': 'Swimming Pools, Waterfalls, Spas, Fountain Basins'
    },
    description: 'Specialized aquatic tile from Roman. Brilliant deep marine blue glaze refracts sunlight through water, creating stunning turquoise resort pool water hues with resistance to pool chlorine.'
  },
  {
    id: 'roman-venere-20x20',
    slug: 'roman-ceramics-venere-20x20',
    name: 'Roman Ceramics Venere (G227058 Cream)',
    category: 'ceramic',
    brand: 'Roman Ceramics',
    size: '20x20',
    surfaceFinish: 'Matte Compact Stone',
    thicknessMm: 7.5,
    pcsPerBox: 25,
    coveragePerBoxM2: 1.00,
    priceRange: 'Rp 78.000 - 100.000 / m²',
    startingPriceNumeric: 78000,
    isFeatured: false,
    images: [
      '/images/products/roman-ceramics-venere-20x20-room.jpg',
      '/images/products/roman-ceramics-venere-20x20-tile.jpg',
      '/images/products/roman-ceramics-venere-20x20-catalog.jpg'
    ],
    specifications: {
      'Catalog Code': 'G227058 Cream / G220501 Dust / G227062 Charcoal - Gol. A',
      'Working Size': '200 x 200 mm',
      'Pcs / Box': '25 pcs (1.00 m²)',
      'Box Weight': '15.6 kg',
      'Application': 'Compact Bathrooms, Commercial Toilets, Janitor Rooms'
    },
    description: 'Compact 20x20cm architectural ceramic tile. Ideal for proper slope creation around floor drains, preventing water pooling in bathrooms and wet utility quarters.'
  }
];
