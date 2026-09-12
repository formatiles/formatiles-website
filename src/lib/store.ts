'use client';

import { Product, Inquiry, InquiryItem, CalculationInput, CalculationOutput } from './types';
import { INITIAL_PRODUCTS, CATEGORIES_DATA, BRANDS_DATA } from './data/initialProducts';
import { supabase, isSupabaseConfigured } from './supabase';

const PRODUCTS_STORAGE_KEY = 'formatiles_products_v1';
const INQUIRIES_STORAGE_KEY = 'formatiles_inquiries_v1';
const CART_STORAGE_KEY = 'formatiles_inquiry_cart_v1';
const ADMIN_AUTH_KEY = 'formatiles_admin_auth_v1';

import { getWhatsAppNumber } from './constants';
export { getWhatsAppNumber };


// ========================
// Products Management
// ========================

export function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch (e) {
    console.error('Error loading products from local storage:', e);
    return INITIAL_PRODUCTS;
  }
}

export function saveLocalProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('formatiles_products_updated'));
  } catch (e) {
    console.error('Error saving products:', e);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          brand: item.brand,
          size: item.size,
          surfaceFinish: item.surface_finish,
          thicknessMm: Number(item.thickness_mm) || 9,
          pcsPerBox: Number(item.pcs_per_box) || 4,
          coveragePerBoxM2: Number(item.coverage_per_box_m2) || 1.44,
          priceRange: item.price_range,
          startingPriceNumeric: Number(item.starting_price_numeric) || 0,
          isFeatured: Boolean(item.is_featured),
          images: Array.isArray(item.images) ? item.images : [item.images],
          specifications: item.specifications || {},
          description: item.description || '',
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local store:', err);
    }
  }
  return getLocalProducts();
}

export async function saveProduct(product: Partial<Product> & { name: string; category: any; brand: string }): Promise<Product> {
  const currentProducts = getLocalProducts();
  const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const newProduct: Product = {
    id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    slug,
    name: product.name,
    category: product.category,
    brand: product.brand,
    size: product.size || '60x60',
    surfaceFinish: product.surfaceFinish || 'Matte',
    thicknessMm: product.thicknessMm || 9,
    pcsPerBox: product.pcsPerBox || 4,
    coveragePerBoxM2: product.coveragePerBoxM2 || 1.44,
    priceRange: product.priceRange || 'Contact for price',
    startingPriceNumeric: product.startingPriceNumeric || 0,
    isFeatured: Boolean(product.isFeatured),
    images: product.images && product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: product.specifications || {},
    description: product.description || '',
    updatedAt: new Date().toISOString()
  };

  const existingIndex = currentProducts.findIndex(p => p.id === newProduct.id);
  let updatedList: Product[];
  if (existingIndex >= 0) {
    updatedList = [...currentProducts];
    updatedList[existingIndex] = { ...currentProducts[existingIndex], ...newProduct };
  } else {
    newProduct.createdAt = new Date().toISOString();
    updatedList = [newProduct, ...currentProducts];
  }

  saveLocalProducts(updatedList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').upsert({
        id: newProduct.id,
        slug: newProduct.slug,
        name: newProduct.name,
        category: newProduct.category,
        brand: newProduct.brand,
        size: newProduct.size,
        surface_finish: newProduct.surfaceFinish,
        thickness_mm: newProduct.thicknessMm,
        pcs_per_box: newProduct.pcsPerBox,
        coverage_per_box_m2: newProduct.coveragePerBoxM2,
        price_range: newProduct.priceRange,
        starting_price_numeric: newProduct.startingPriceNumeric,
        is_featured: newProduct.isFeatured,
        images: newProduct.images,
        specifications: newProduct.specifications,
        description: newProduct.description,
        updated_at: newProduct.updatedAt
      });
    } catch (e) {
      console.warn('Supabase upsert error:', e);
    }
  }

  return newProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  const currentProducts = getLocalProducts();
  const filtered = currentProducts.filter(p => p.id !== id);
  saveLocalProducts(filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }
}

// ========================
// Bulk Import
// ========================

export async function bulkImportProducts(productsToImport: Array<Partial<Product>>): Promise<{ imported: number; errors: string[] }> {
  const errors: string[] = [];
  const validProducts: Product[] = [];
  const current = getLocalProducts();

  productsToImport.forEach((raw, index) => {
    if (!raw.name) {
      errors.push(`Row ${index + 1}: Name is required.`);
      return;
    }
    const cat = (raw.category?.toLowerCase() || 'ceramic') as any;
    const slug = (raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 5)).replace(/(^-|-$)/g, '');
    
    const prod: Product = {
      id: raw.id || `prod-imp-${Date.now()}-${index}`,
      slug,
      name: raw.name,
      category: ['ceramic', 'granite', 'wall-panel', 'spc'].includes(cat) ? cat : 'ceramic',
      brand: raw.brand || 'Forma Luxe',
      size: raw.size || '60x60',
      surfaceFinish: raw.surfaceFinish || 'Matte',
      thicknessMm: Number(raw.thicknessMm) || 9,
      pcsPerBox: Number(raw.pcsPerBox) || 4,
      coveragePerBoxM2: Number(raw.coveragePerBoxM2) || 1.44,
      priceRange: raw.priceRange || 'Contact for price',
      startingPriceNumeric: Number(raw.startingPriceNumeric) || 0,
      isFeatured: Boolean(raw.isFeatured),
      images: Array.isArray(raw.images) && raw.images.length > 0 
        ? raw.images 
        : typeof (raw as any).imageUrls === 'string' && (raw as any).imageUrls.length > 0 
          ? (raw as any).imageUrls.split(';').map((s: string) => s.trim())
          : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      specifications: raw.specifications || {},
      description: raw.description || '',
      createdAt: new Date().toISOString()
    };
    validProducts.push(prod);
  });

  if (validProducts.length > 0) {
    const combined = [...validProducts, ...current];
    saveLocalProducts(combined);

    if (isSupabaseConfigured && supabase) {
      try {
        const rows = validProducts.map(p => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.category,
          brand: p.brand,
          size: p.size,
          surface_finish: p.surfaceFinish,
          thickness_mm: p.thicknessMm,
          pcs_per_box: p.pcsPerBox,
          coverage_per_box_m2: p.coveragePerBoxM2,
          price_range: p.priceRange,
          starting_price_numeric: p.startingPriceNumeric,
          is_featured: p.isFeatured,
          images: p.images,
          specifications: p.specifications,
          description: p.description
        }));
        await supabase.from('products').upsert(rows);
      } catch (e) {
        console.warn('Supabase bulk upsert error:', e);
      }
    }
  }

  return { imported: validProducts.length, errors };
}

// ========================
// Inquiries & Leads Management
// ========================

export function getLocalInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  const list = getLocalInquiries();
  const updated = [newInquiry, ...list];
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('formatiles_inquiries_updated'));
  }

  if (isSupabaseConfigured && supabase) {
    supabase.from('inquiries').insert({
      id: newInquiry.id,
      customer_name: newInquiry.customerName,
      customer_phone: newInquiry.customerPhone,
      customer_email: newInquiry.customerEmail,
      project_location: newInquiry.projectLocation,
      items: newInquiry.items,
      estimated_area_m2: newInquiry.totalAreaM2,
      notes: newInquiry.message,
      status: newInquiry.status,
      source: newInquiry.source
    }).then();
  }

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): void {
  const list = getLocalInquiries();
  const updated = list.map(inq => inq.id === id ? { ...inq, status } : inq);
  if (typeof window !== 'undefined') {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('formatiles_inquiries_updated'));
  }
  if (isSupabaseConfigured && supabase) {
    supabase.from('inquiries').update({ status }).eq('id', id).then();
  }
}

// ========================
// Calculator Engine
// ========================

export function calculateTileRequirements(input: CalculationInput): CalculationOutput {
  const netArea = input.useDirectArea && input.directAreaM2 
    ? Number(input.directAreaM2)
    : Number(input.lengthM || 0) * Number(input.widthM || 0);

  const wasteMultiplier = 1 + (Number(input.wastePercent || 0) / 100);
  const totalAreaWithWaste = netArea * wasteMultiplier;
  const wasteArea = totalAreaWithWaste - netArea;

  const coveragePerBox = Number(input.coveragePerBoxM2) > 0 ? Number(input.coveragePerBoxM2) : 1.44;
  const pcsPerBox = Number(input.pcsPerBox) > 0 ? Number(input.pcsPerBox) : 4;

  const boxesNeeded = Math.ceil(totalAreaWithWaste / coveragePerBox);
  const actualCoverage = boxesNeeded * coveragePerBox;
  const totalPieces = boxesNeeded * pcsPerBox;

  const approxPrice = input.approxPricePerM2 || 200000;
  const estimatedBudgetMin = Math.round(totalAreaWithWaste * (approxPrice * 0.9));
  const estimatedBudgetMax = Math.round(totalAreaWithWaste * (approxPrice * 1.2));

  const breakdownSummary = `${netArea.toFixed(2)} m² net + ${input.wastePercent}% waste (${wasteArea.toFixed(2)} m²) = ${totalAreaWithWaste.toFixed(2)} m². Requires ${boxesNeeded} boxes (${actualCoverage.toFixed(2)} m² coverage, ~${totalPieces} tiles).`;

  return {
    netAreaM2: Number(netArea.toFixed(2)),
    wasteAreaM2: Number(wasteArea.toFixed(2)),
    totalAreaM2: Number(totalAreaWithWaste.toFixed(2)),
    boxesNeeded,
    actualCoverageM2: Number(actualCoverage.toFixed(2)),
    totalPieces,
    estimatedBudgetMin,
    estimatedBudgetMax,
    breakdownSummary
  };
}

// ========================
// WhatsApp Deep Links
// ========================

export function generateWhatsAppProductLink(product: Product, customNote?: string): string {
  const phone = getWhatsAppNumber();
  const text = `Hi FormaTiles, I am interested in *${product.name}* (${product.brand} - ${product.size} - ${product.surfaceFinish}).
Category: ${product.category.toUpperCase()}
Price Range: ${product.priceRange}

${customNote ? `Notes: ${customNote}\n\n` : ''}I would like to ask about availability, physical sample viewing, and an official quote. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppCalculationLink(calcOutput: CalculationOutput, productOrTileName: string, location?: string): string {
  const phone = getWhatsAppNumber();
  const text = `Hi FormaTiles, I used your architectural calculator for *${productOrTileName}*:

📐 *Calculation Breakdown:*
• Net Area: ${calcOutput.netAreaM2} m²
• Total with Wastage: ${calcOutput.totalAreaM2} m²
• Recommended Order: *${calcOutput.boxesNeeded} boxes* (~${calcOutput.totalPieces} pcs, covers ${calcOutput.actualCoverageM2} m²)
${location ? `• Project Location: ${location}\n` : ''}
Could you please confirm current stock availability and provide an exact project quotation? Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppInquiryCartLink(items: InquiryItem[], customerName: string, location?: string): string {
  const phone = getWhatsAppNumber();
  const itemsText = items.map((item, idx) => 
    `${idx + 1}. *${item.productName}* (${item.size}) - Approx: ${item.estimatedAreaM2} m² (${item.calculatedBoxes} boxes)`
  ).join('\n');

  const text = `Hi FormaTiles, I would like to request an official project quote from your website showroom:

👤 *Customer:* ${customerName || 'Customer'}
📍 *Location:* ${location || 'Not specified'}

📋 *Selected Materials:*
${itemsText}

Please let me know product availability, lead times, and special volume pricing. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// ========================
// Admin Auth Mock / Session
// ========================

export function checkAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated';
}

export function loginAdmin(pin: string): boolean {
  const envKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
  if (
    pin === 'f0rm4@123' ||
    pin === 'formatiles2026' ||
    pin === 'admin123' ||
    (envKey && pin === envKey)
  ) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
    return true;
  }
  return false;
}


export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_AUTH_KEY);
}
