'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

export const DICTIONARY: Translations = {
  // Header & Nav
  navShowroom: { en: 'Showroom', id: 'Galeri' },
  navCatalog: { en: 'Product Catalog', id: 'Katalog Produk' },
  navCalculator: { en: 'Tile & SPC Calculator', id: 'Kalkulator Keramik & SPC' },
  navAdmin: { en: 'Admin', id: 'Admin' },
  btnWhatsApp: { en: 'WhatsApp Sales', id: 'WhatsApp Sales' },
  btnInquiries: { en: 'Inquiries', id: 'Permintaan Harga' },
  
  // Hero
  heroBadge: { en: 'Architectural Material Showroom V1', id: 'Showroom Material Arsitektur V1' },
  heroTitle1: { en: 'Refined Surfaces for', id: 'Permukaan Eksklusif untuk' },
  heroTitleHighlight: { en: 'Elevated', id: 'Gaya Hidup' },
  heroTitle2: { en: 'Architectural Living.', id: 'Arsitektural Modern.' },
  heroDesc: {
    en: 'Discover curated large-format granite slabs, designer porcelain ceramics, 3D acoustic fluted wall panels, and rigid-core SPC flooring. Engineered for modern residential and commercial sanctuaries.',
    id: 'Koleksi pilihan lempengan granit motif marmer, keramik porselen arsitektural, wall panel 3D akustik, dan lantai SPC tahan air. Dirancang khusus untuk hunian mewah dan proyek komersial.'
  },
  heroCtaCatalog: { en: 'Explore Digital Catalog', id: 'Jelajahi Katalog Produk' },
  heroCtaCalc: { en: 'Tile & SPC Calculator', id: 'Kalkulator Kebutuhan' },
  heroFeature1: { en: 'Precision Calibrated Sizing', id: 'Ukuran Presisi & Rata (Rectified)' },
  heroFeature2: { en: 'Accurate Box Quantity Estimator', id: 'Estimasi Jumlah Dus Akurat' },
  heroFeature3: { en: 'Instant WhatsApp Quotations', id: 'Penawaran Harga Cepat via WhatsApp' },

  // Categories
  catSectionTag: { en: 'Core Material Collections', id: 'Koleksi Material Utama' },
  catSectionTitle: { en: 'Architectural Categories', id: 'Kategori Produk' },
  catSectionDesc: {
    en: 'Engineered finishes categorized by application, texture, and durability.',
    id: 'Pilihan material berkualitas tinggi berdasarkan fungsi, tekstur, dan ketahanan.'
  },
  btnViewAllMaterials: { en: 'View All Materials', id: 'Lihat Semua Material' },

  // Quick Calculator Widget
  quickCalcTag: { en: 'Digital Simulation', id: 'Simulasi Perhitungan' },
  quickCalcTitle: { en: 'Calculate Your Surface Requirements in Seconds', id: 'Hitung Kebutuhan Keramik & Lantai Dalam Hitungan Detik' },
  quickCalcDesc: {
    en: 'Avoid under-ordering or excessive tile waste. Our architectural algorithm factors in perimeter cutting cuts, grout lines, and standard manufacturer box coverage.',
    id: 'Hindari kekurangan material atau sisa berlebih. Sistem kami menghitung luas ruangan, estimasi potongan (waste), dan konversi jumlah dus pabrik secara otomatis.'
  },
  quickCalcPoint1: { en: 'Includes 5% to 15% wastage allowance for corners & diagonal cuts', id: 'Termasuk toleransi potongan 5% hingga 15% untuk sudut & potongan pinggir' },
  quickCalcPoint2: { en: 'Instant conversion to real factory box quantities (m²/box)', id: 'Konversi langsung ke satuan dus pabrik yang akurat (m²/dus)' },
  quickCalcPoint3: { en: 'One-click send calculation breakdown to FormaTiles WhatsApp', id: 'Satu klik kirim rincian perhitungan ke WhatsApp FormaTiles' },
  quickCalcLaunchFull: { en: 'Launch Full Calculator Suite (SPC & Wall Panels)', id: 'Buka Kalkulator Lengkap (SPC & Wall Panel)' },
  quickCalcCardTitle: { en: 'Quick Floor Estimator', id: 'Estimator Cepat Ruangan' },
  quickCalcLength: { en: 'Room Length (m)', id: 'Panjang Ruangan (m)' },
  quickCalcWidth: { en: 'Room Width (m)', id: 'Lebar Ruangan (m)' },
  quickCalcTileSize: { en: 'Tile Size', id: 'Ukuran Keramik / Granit' },
  quickCalcWaste: { en: 'Wastage Allowance', id: 'Toleransi Potongan (Waste)' },
  quickCalcTotalArea: { en: 'Total Required', id: 'Total Luas Kebutuhan' },
  quickCalcBoxesToOrder: { en: 'Boxes to Order', id: 'Jumlah Dus Dipesan' },
  quickCalcBtnSend: { en: 'Send Calculation to WhatsApp', id: 'Kirim Hasil Hitungan ke WhatsApp' },

  // Featured
  featSectionTag: { en: 'Showroom Highlights', id: 'Pilihan Populer' },
  featSectionTitle: { en: 'Featured Surfaces', id: 'Material Unggulan' },
  featSectionDesc: {
    en: 'High-demand large-format granites, Italian terrazzo ceramic, and acoustic wall claddings.',
    id: 'Lempengan granit format besar, keramik motif terrazzo Italia, dan wall panel modern.'
  },
  btnExploreFullCatalog: { en: 'Explore Full Catalog', id: 'Lihat Seluruh Katalog' },

  // Catalog Page
  catalogTitle: { en: 'Architectural Surface Catalog', id: 'Katalog Material & Keramik' },
  catalogDesc: {
    en: 'Explore high-grade glazed porcelain, natural aggregate terrazzo, acoustic wall panels, and waterproof SPC planks. Request physical sample viewing or volume pricing via WhatsApp.',
    id: 'Koleksi granit porcelain glazed, keramik terrazzo natural, kisi-kisi wall panel akustik, dan lantai SPC vinyl anti air. Dapatkan sampel fisik dan harga proyek via WhatsApp.'
  },
  searchPlaceholder: { en: 'Search by tile name, brand, size (e.g. 60x120)...', id: 'Cari nama keramik, merk, ukuran (misal: 60x120)...' },
  sortLabel: { en: 'Sort', id: 'Urutkan' },
  sortFeatured: { en: 'Featured First', id: 'Pilihan Utama' },
  sortPriceLow: { en: 'Price: Low to High', id: 'Harga: Termurah' },
  sortPriceHigh: { en: 'Price: High to Low', id: 'Harga: Tertinggi' },
  sortNameAsc: { en: 'Alphabetical (A-Z)', id: 'Nama: A-Z' },
  filtersBtn: { en: 'Filters', id: 'Filter' },
  resetFiltersBtn: { en: 'Reset Filters', id: 'Reset Filter' },
  showingLabel: { en: 'Showing', id: 'Menampilkan' },
  surfacesLabel: { en: 'surfaces', id: 'produk' },
  priceRangeLabel: { en: 'Price Range', id: 'Kisaran Harga' },
  btnAskWhatsApp: { en: 'Ask WhatsApp', id: 'Tanya via WA' },
  btnAddQuote: { en: '+ Add Quote', id: '+ Minta Harga' },
  btnCalculateArea: { en: 'Calculate area for this tile', id: 'Hitung jumlah dus untuk keramik ini' },

  // Product Detail Page
  btnBackCatalog: { en: 'Back to Product Catalog', id: 'Kembali ke Katalog' },
  approxPriceNotice: { en: 'Approximate Showroom Price Range', id: 'Perkiraan Kisaran Harga Showroom' },
  priceDisclaimer: {
    en: '*Indicative price range. Final project pricing is determined based on quantity, project specifications, and logistical delivery requirements.',
    id: '*Kisaran harga perkiraan. Harga penawaran final akan disesuaikan dengan volume pesanan dan lokasi pengiriman proyek.'
  },
  btnAskViaWhatsApp: { en: 'Ask via WhatsApp (Pre-filled Inquiry)', id: 'Tanya via WhatsApp (Pesan Otomatis)' },
  btnAddToProjectInquiry: { en: 'Add to Project Inquiry', id: 'Tambah ke Keranjang Penawaran' },
  btnCalculateTileBoxes: { en: 'Calculate Tile Boxes', id: 'Hitung Jumlah Dus' },
  techSpecTitle: { en: 'Technical & Packaging Specifications', id: 'Spesifikasi Teknis & Kemasan' },
  coveragePerBox: { en: 'Coverage per Box', id: 'Luas per Dus' },
  piecesPerBox: { en: 'Pieces per Box', id: 'Jumlah Keping per Dus' },
  dimensions: { en: 'Dimensions', id: 'Ukuran Dimensi' },
  thickness: { en: 'Thickness', id: 'Ketebalan' },
  surfaceTexture: { en: 'Surface Texture', id: 'Tekstur Permukaan' },
  similarHeading: { en: 'Similar In This Category', id: 'Produk Serupa' },

  // Calculator Page
  calcSuiteTitle: { en: 'Tile, Slab & SPC Calculator', id: 'Kalkulator Keramik, Granit & SPC' },
  calcSuiteDesc: {
    en: 'Accurately plan your architectural surface procurement. Calculate net room dimensions, recommended wastage margins, exact factory box requirements, and send instant quote requests to FormaTiles via WhatsApp.',
    id: 'Hitung kebutuhan belanja keramik dan lantai dengan presisi. Dapatkan estimasi luas bersih, cadangan potongan (waste), konversi dus pabrik, dan kirim pesan penawaran langsung ke WhatsApp FormaTiles.'
  },
  tabFloorWall: { en: 'Floor & Wall Tiles', id: 'Keramik & Granit Lantai/Dinding' },
  tabSPC: { en: 'SPC Flooring & Skirting', id: 'Lantai SPC & Lis Dinding' },
  tabWallPanel: { en: 'Acoustic Wall Panels', id: 'Wall Panel & Kisi-kisi' },
  inputStep1: { en: '1. Enter Room & Surface Specifications', id: '1. Masukkan Ukuran Ruangan & Spesifikasi' },
  toggleDimensions: { en: 'Dimensions (Length × Width)', id: 'Ukuran (Panjang × Lebar)' },
  toggleDirectArea: { en: 'Direct Area (Total m²)', id: 'Luas Total Langsung (m²)' },
  fieldTilePreset: { en: 'Surface / Tile Size Specification', id: 'Pilihan Ukuran Keramik / Bahan' },
  fieldWaste: { en: 'Wastage & Cutting Allowance (%)', id: 'Cadangan Potongan / Waste (%)' },
  fieldCity: { en: 'Project Location / City (For delivery rate check)', id: 'Lokasi Proyek / Kota (Untuk cek ongkos kirim)' },
  resultTitle: { en: 'Calculation Result', id: 'Hasil Perhitungan' },
  resultOrderQuantity: { en: 'Recommended Order Quantity', id: 'Rekomendasi Jumlah Dipesan' },
  resultNetArea: { en: 'Net Room / Wall Area', id: 'Luas Bersih Ruangan / Dinding' },
  resultTotalCalculated: { en: 'Total Calculated Area', id: 'Total Luas Dihitung' },
  resultEstimatedBudget: { en: 'Estimated Material Budget', id: 'Perkiraan Anggaran Material' },
  calcDisclaimer: {
    en: 'Calculations are estimates only. Grout width, tile tonality batches, and cutting complexity should be reviewed with FormaTiles before ordering.',
    id: 'Hasil perhitungan adalah simulasi estimasi. Lebar nat semen, nomor seri warna pabrik (tonality), dan sudut ruangan sebaiknya dikonfirmasi dengan tim FormaTiles sebelum order.'
  },

  // Inquiry Drawer
  drawerTitle: { en: 'Project Quotation Drawer', id: 'Daftar Penawaran Proyek' },
  drawerEmptyTitle: { en: 'Your project inquiry is empty', id: 'Daftar penawaran masih kosong' },
  drawerEmptyDesc: {
    en: 'Browse our architectural catalog and add surfaces or calculate floor boxes to request a consolidated quotation.',
    id: 'Pilih keramik atau lantai dari katalog kami untuk meminta penawaran harga gabungan.'
  },
  drawerFormName: { en: 'Your Name *', id: 'Nama Lengkap Anda *' },
  drawerFormPhone: { en: 'WhatsApp Phone Number *', id: 'Nomor WhatsApp *' },
  drawerFormCity: { en: 'Project City / Location (Optional)', id: 'Kota / Lokasi Proyek (Opsional)' },
  drawerFormNotes: { en: 'Additional Notes / Project Requirements', id: 'Catatan Tambahan / Kebutuhan Proyek' },
  drawerBtnSend: { en: 'Send Quote Request via WhatsApp', id: 'Kirim Permintaan Harga via WhatsApp' },

  // Consultation Banner
  bannerTag: { en: 'Direct Architect & Contractor Support', id: 'Layanan Arsitek, Kontraktor & Pemilik Proyek' },
  bannerTitle: { en: 'Need Custom Slabs or Project Sourcing?', id: 'Butuh Keramik Khusus atau Pengadaan Proyek?' },
  bannerDesc: {
    en: 'From luxury residential villas to commercial retail chains, our materials team provides physical sample deliveries, CAD tile cut layouts, and tiered wholesale project pricing.',
    id: 'Dari villa hunian pribadi hingga proyek ruko & gedung, tim kami siap mengirimkan sampel fisik langsung, konsultasi pola potong keramik, serta harga grosir volume proyek.'
  },
  bannerBtnWa: { en: 'Chat with Specialist on WhatsApp', id: 'Konsultasi via WhatsApp Sekarang' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id'); // Default to Indonesian for local context

  useEffect(() => {
    try {
      const saved = localStorage.getItem('formatiles_lang') as Language;
      if (saved && (saved === 'en' || saved === 'id')) {
        setLanguageState(saved);
      }
    } catch (e) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('formatiles_lang', lang);
    } catch (e) {}
  };

  const t = (key: string): string => {
    const entry = DICTIONARY[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
