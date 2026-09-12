'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  MessageSquare, 
  ShoppingBag, 
  Calculator, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Product, ProductCategory } from '../../lib/types';
import { fetchProducts, generateWhatsAppProductLink } from '../../lib/store';
import { useInquiry } from '../../context/InquiryContext';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedFinish, setSelectedFinish] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addItem } = useInquiry();

  useEffect(() => {
    fetchProducts().then(setProducts);

    const handleUpdate = () => {
      fetchProducts().then(setProducts);
    };
    window.addEventListener('formatiles_products_updated', handleUpdate);
    return () => window.removeEventListener('formatiles_products_updated', handleUpdate);
  }, []);

  // Synchronize category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Extract unique filters from loaded products
  const brands = useMemo(() => {
    const set = new Set(products.map(p => p.brand).filter(Boolean));
    return Array.from(set);
  }, [products]);

  const sizes = useMemo(() => {
    const set = new Set(products.map(p => p.size).filter(Boolean));
    return Array.from(set);
  }, [products]);

  const finishes = useMemo(() => {
    const set = new Set(products.map(p => p.surfaceFinish).filter(Boolean));
    return Array.from(set);
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSize = p.size.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSize && !matchDesc) return false;
      }
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Size
      if (selectedSize !== 'all' && p.size !== selectedSize) {
        return false;
      }
      // Finish
      if (selectedFinish !== 'all' && p.surfaceFinish !== selectedFinish) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      }
      if (sortBy === 'price-low') {
        return (a.startingPriceNumeric || 0) - (b.startingPriceNumeric || 0);
      }
      if (sortBy === 'price-high') {
        return (b.startingPriceNumeric || 0) - (a.startingPriceNumeric || 0);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedBrand, selectedSize, selectedFinish, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedFinish('all');
    setSelectedSize('all');
    setSearchQuery('');
  };

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'granite', label: 'Niro Granite (Porcelain Slabs)' },
    { id: 'ceramic', label: 'Roman Ceramics (Gres Tiles)' },
  ];

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Product Catalog</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
            Architectural Surface Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '1rem' }}>
            Explore high-grade glazed porcelain, natural aggregate terrazzo, acoustic wall panels, and waterproof SPC planks. Request physical sample viewing or volume pricing via WhatsApp.
          </p>
        </div>

        {/* Category Pills Nav */}
        <div 
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--accent-border)'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 600 : 400,
                  background: isSelected ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#0b0d0e' : 'var(--text-secondary)',
                  border: isSelected ? 'none' : '1px solid var(--accent-border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '480px' }}>
            <Search 
              size={18} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search by tile name, brand, size (e.g. 60x120)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.75rem' }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-field"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', width: 'auto' }}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>
        </div>

        {/* Extended Filter Panel (Expandable) */}
        {isMobileFilterOpen && (
          <div 
            className="glass-panel"
            style={{
              padding: '1.5rem',
              marginBottom: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="select-field"
              >
                <option value="all">All Brands</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Size Dimension
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="select-field"
              >
                <option value="all">All Sizes</option>
                {sizes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Surface Finish
              </label>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="select-field"
              >
                <option value="all">All Finishes</option>
                {finishes.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={resetFilters}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Counter & Active Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProducts.length}</strong> surfaces
          </div>
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || selectedSize !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              style={{ color: 'var(--accent-gold)', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div 
            className="glass-panel"
            style={{ textAlign: 'center', padding: '5rem 2rem' }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              No architectural surfaces match your selection
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Try broadening your search query or reset the category and size filters to see our full collection.
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="glass-panel glass-panel-hover"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Image & Quick Badges */}
                <Link 
                  href={`/catalog/${prod.slug}`} 
                  style={{ position: 'relative', height: '240px', overflow: 'hidden', display: 'block' }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span 
                    className="chip chip-gold" 
                    style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}
                  >
                    {prod.category.toUpperCase()}
                  </span>
                  <span 
                    className="chip" 
                    style={{ position: 'absolute', bottom: '0.85rem', right: '0.85rem', background: 'rgba(11, 13, 14, 0.8)' }}
                  >
                    {prod.size}
                  </span>
                </Link>

                {/* Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    {prod.brand} • {prod.surfaceFinish}
                  </div>
                  <Link href={`/catalog/${prod.slug}`}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                      {prod.name}
                    </h3>
                  </Link>

                  {/* Packaging spec chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    <span className="chip" style={{ fontSize: '0.7rem' }}>
                      {prod.coveragePerBoxM2} m²/box
                    </span>
                    <span className="chip" style={{ fontSize: '0.7rem' }}>
                      {prod.thicknessMm} mm
                    </span>
                    <span className="chip" style={{ fontSize: '0.7rem' }}>
                      {prod.pcsPerBox} pcs
                    </span>
                  </div>

                  {/* Price Range Notice */}
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--accent-border)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Price Range
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-gold-light)', marginBottom: '1rem' }}>
                      {prod.priceRange}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <a
                        href={generateWhatsAppProductLink(prod)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                        style={{ fontSize: '0.775rem', padding: '0.55rem 0.4rem' }}
                      >
                        <MessageSquare size={13} /> Ask WhatsApp
                      </a>
                      <button
                        onClick={() => addItem(prod, 10)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.775rem', padding: '0.55rem 0.4rem' }}
                      >
                        <ShoppingBag size={13} /> + Quote
                      </button>
                    </div>

                    {/* Calculator link */}
                    <div style={{ marginTop: '0.6rem', textAlign: 'center' }}>
                      <Link 
                        href={`/calculator?productId=${prod.id}`}
                        style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Calculator size={12} color="var(--accent-gold)" /> Calculate area for this tile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
