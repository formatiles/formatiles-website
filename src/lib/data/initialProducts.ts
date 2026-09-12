import { Product, CategoryInfo, BrandInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'granite',
    name: 'Granite & Slabs',
    tagline: 'Grand format porcelain slabs with timeless veining',
    description: 'Engineered large-format sintered stone and glazed granite slabs featuring hyper-realistic Italian marble veining, diamond-polish gloss, and high structural density for luxury floors and feature walls.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    commonSizes: ['60x120', '80x80', '120x240', '100x100'],
    benefits: ['Ultra-low water absorption (<0.05%)', 'Scratch & stain resistant', 'Bookmatch veining options']
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Porcelain',
    tagline: 'Durable architectural tiles for balanced contemporary spaces',
    description: 'Versatile floor and wall ceramics ranging from Venetian terrazzo looks and artisan subways to matte stone-texture surfaces, designed for high-traffic residential and commercial sanctuaries.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
    commonSizes: ['60x60', '30x60', '40x40', '30x30'],
    benefits: ['High thermal resistance', 'Easy maintenance', 'Anti-slip R10/R11 ratings available']
  },
  {
    id: 'spc',
    name: 'SPC Flooring',
    tagline: '100% waterproof rigid-core timber textures',
    description: 'Stone Plastic Composite (SPC) luxury planks featuring ultra-dense limestone composite cores, realistic synchronous wood grain textures, and pre-attached acoustic IXPE underlayment.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    commonSizes: ['18x122', '15x90 (Herringbone)', '22x150'],
    benefits: ['100% waterproof & termite-proof', 'Uniclic quick-lock system', 'Built-in sound dampening']
  },
  {
    id: 'wall-panel',
    name: 'Wall Panel & Fluted Slats',
    tagline: 'Dimensional acoustic claddings with architectural rhythm',
    description: 'Precision-extruded architectural WPC and timber acoustic fluted panels designed to create dramatic accent walls, TV backdrops, and acoustic warmth in residential and hospitality interiors.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80',
    commonSizes: ['16x290 cm', '20x290 cm', '12x280 cm'],
    benefits: ['Superior acoustic PET backing', 'Ultra-fast tongue & groove installation', 'Seamless vertical joints']
  }
];

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'forma-luxe',
    name: 'Forma Luxe',
    origin: 'Italy / Precision Sintered',
    specialty: 'Large format luxury granite & marble porcelain'
  },
  {
    id: 'moda-gres',
    name: 'Moda Gres',
    origin: 'Spain / Indonesia',
    specialty: 'Architectural floor ceramic and terrazzo tiles'
  },
  {
    id: 'nordic-step',
    name: 'Nordic Step',
    origin: 'Scandinavia Inspired',
    specialty: 'Commercial grade rigid core SPC flooring'
  },
  {
    id: 'aura-panel',
    name: 'Aura Panel',
    origin: 'Architectural Cladding',
    specialty: 'Acoustic fluted slats & 3D WPC wall panels'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'calacatta-gold-glazed-porcelain',
    name: 'Calacatta Gold Glazed Porcelain',
    category: 'granite',
    brand: 'Forma Luxe',
    size: '60x120',
    surfaceFinish: 'Polished Mirror Gloss',
    thicknessMm: 9.5,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 245.000 - 310.000 / m²',
    startingPriceNumeric: 245000,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Water Absorption': '< 0.05% (Impervious)',
      'Surface Type': 'Nano Glaze High Mirror',
      'Edge': 'Rectified Monocaliber',
      'Application': 'Living Room, Master Bathroom, Lobby Feature Floor',
      'Box Weight': '31.5 kg'
    },
    description: 'An iconic Carrara marble recreation featuring warm golden ochre and soft smoke veins stretching gracefully across a pure milky white porcelain body. Rectified micro-beveled edges allow for ultra-slim 1.5mm grout lines.'
  },
  {
    id: 'prod-002',
    slug: 'nero-marquina-grand-slab',
    name: 'Nero Marquina Grand Slab',
    category: 'granite',
    brand: 'Forma Luxe',
    size: '80x80',
    surfaceFinish: 'Polished Glass Finish',
    thicknessMm: 10,
    pcsPerBox: 3,
    coveragePerBoxM2: 1.92,
    priceRange: 'Rp 290.000 - 360.000 / m²',
    startingPriceNumeric: 290000,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Water Absorption': '< 0.03%',
      'Surface Type': 'Double Charge Diamond Polished',
      'Edge': 'Precision Rectified',
      'Application': 'Executive Suites, Powder Rooms, Luxury Kitchen Islands',
      'Box Weight': '43.0 kg'
    },
    description: 'Deep obsidian black backdrop punctuated with crisp, lightning-white quartz striations. Crafted to evoke the dramatic Basque Country quarry stones with the unbreakable resilience of porcelain stoneware.'
  },
  {
    id: 'prod-003',
    slug: 'ceppo-di-gre-terrazzo',
    name: 'Ceppo Di Gré Terrazzo Tile',
    category: 'ceramic',
    brand: 'Moda Gres',
    size: '60x60',
    surfaceFinish: 'Matte Silk Anti-Slip R10',
    thicknessMm: 9.0,
    pcsPerBox: 4,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 175.000 - 225.000 / m²',
    startingPriceNumeric: 175000,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Slip Rating': 'R10 Certified',
      'Wear Resistance': 'PEI IV Heavy Residential',
      'Surface Type': 'Honed Natural Stone Texture',
      'Application': 'Cafes, Terraces, Minimalist Living Rooms, Wet Areas',
      'Box Weight': '28.0 kg'
    },
    description: 'Inspired by the historic sedimentary conglomerate stone of Lombardy. Subtle grey and pebble aggregates create a rhythmic architectural texture that stays tactile, clean, and slip-free.'
  },
  {
    id: 'prod-004',
    slug: 'scandinavian-natural-oak-spc',
    name: 'Scandinavian Natural Oak SPC',
    category: 'spc',
    brand: 'Nordic Step',
    size: '18x122',
    surfaceFinish: 'EIR Synchronized Wood Grain',
    thicknessMm: 5.0,
    pcsPerBox: 10,
    coveragePerBoxM2: 2.196,
    priceRange: 'Rp 195.000 - 245.000 / m²',
    startingPriceNumeric: 195000,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Wear Layer': '0.5 mm Commercial Grade',
      'Underlayment': '1.5 mm IXPE Acoustic Membrane Pre-attached',
      'Locking System': 'Valinge 2G Click-Lock',
      'Fire Rating': 'B1-s1 Flame Retardant',
      'Waterproof': '100% Impervious Core'
    },
    description: 'Gentle golden honey oak with authentic wire-brushed matte grain. Engineered with ultra-dense limestone core that resists expansion in humid tropical climates, complete with built-in acoustic underlay.'
  },
  {
    id: 'prod-005',
    slug: 'fluted-acoustic-oak-wall-panel',
    name: 'Fluted Acoustic Oak Wall Panel',
    category: 'wall-panel',
    brand: 'Aura Panel',
    size: '16x290 cm',
    surfaceFinish: 'Architectural Wood Veneer',
    thicknessMm: 21.0,
    pcsPerBox: 1,
    coveragePerBoxM2: 0.464,
    priceRange: 'Rp 160.000 - 210.000 / panel',
    startingPriceNumeric: 160000,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Slat Width': '27 mm with 13 mm Gap',
      'Backing Material': 'Recycled Sound Absorption Acoustic PET Felt (9mm)',
      'Installation': 'Direct Screw / Construction Adhesive',
      'Application': 'Living Room Feature Walls, Headboards, Conference Rooms'
    },
    description: 'Modern Danish acoustic slat wall panel. Combines sustainable FSC certified natural wood slat aesthetic with high sound dampening performance, reducing room reverberation and echo with stunning visual depth.'
  },
  {
    id: 'prod-006',
    slug: 'travertine-warm-beige-granite',
    name: 'Travertine Warm Beige Porcelain Slab',
    category: 'granite',
    brand: 'Forma Luxe',
    size: '60x120',
    surfaceFinish: 'Honed Satin Velvety',
    thicknessMm: 9.5,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 260.000 - 325.000 / m²',
    startingPriceNumeric: 260000,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Texture': 'Cross-cut Roman Travertine striation',
      'Grout Recommendation': 'Mapei Warm Sand 1.5mm',
      'Application': 'Minimalist Japandi Interiors, Bathrooms, Façade Claddings'
    },
    description: 'An understated architectural surface reflecting the soothing, warm porous elegance of Tivoli travertine without the fragility or sealing maintenance required by natural stone.'
  },
  {
    id: 'prod-007',
    slug: 'smoked-walnut-chevron-spc',
    name: 'Smoked Walnut Chevron SPC',
    category: 'spc',
    brand: 'Nordic Step',
    size: '15x90',
    surfaceFinish: 'Deep Wood Texture Satin',
    thicknessMm: 5.5,
    pcsPerBox: 12,
    coveragePerBoxM2: 1.62,
    priceRange: 'Rp 230.000 - 290.000 / m²',
    startingPriceNumeric: 230000,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Pattern': 'Herringbone & 45-degree Chevron Ready',
      'Wear Layer': '0.55 mm Heavy Commercial',
      'Locking System': '4-sided Micro Bevel Angle Click'
    },
    description: 'Rich dark walnut tones with subtle smoky undertones. Engineered specifically for timeless herringbone or chevron geometric layouts, adding regal mid-century sophistication to bedrooms and galleries.'
  },
  {
    id: 'prod-008',
    slug: 'charcoal-linear-3d-wall-panel',
    name: 'Charcoal Linear 3D Wall Panel',
    category: 'wall-panel',
    brand: 'Aura Panel',
    size: '20x290 cm',
    surfaceFinish: 'Architectural Matte WPC',
    thicknessMm: 18.0,
    pcsPerBox: 1,
    coveragePerBoxM2: 0.58,
    priceRange: 'Rp 175.000 - 230.000 / panel',
    startingPriceNumeric: 175000,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: {
      'Profile': 'Asymmetric 3D fluted profile',
      'Material': 'Co-extruded composite polymer (waterproof & mould proof)',
      'Application': 'Semi-outdoor ceilings, foyer accent partitions'
    },
    description: 'Monolithic charcoal slats creating sharp linear shadows and contemporary tactile rhythm. Waterproof and UV-stabilized for entrance lobbies and luxury master suites.'
  }
];
