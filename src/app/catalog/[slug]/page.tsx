'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageSquare, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  Layers, 
  Check, 
  ChevronRight,
  PackageCheck,
  Share2
} from 'lucide-react';
import { Product } from '../../../lib/types';
import { fetchProducts, generateWhatsAppProductLink, getWhatsAppNumber } from '../../../lib/store';
import { useInquiry } from '../../../context/InquiryContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addItem } = useInquiry();
  const waNumber = getWhatsAppNumber();

  useEffect(() => {
    fetchProducts().then((all) => {
      const found = all.find((p) => p.slug === slug || p.id === slug);
      if (found) {
        setProduct(found);
        const related = all
          .filter((p) => p.category === found.category && p.id !== found.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
      setLoading(false);
    });
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading surface details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The requested architectural surface is either archived or unavailable.
        </p>
        <Link href="/catalog" className="btn btn-primary">
          Back to Product Catalog
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div style={{ padding: '2.5rem 0 6rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem'
          }}
        >
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/catalog" style={{ color: 'var(--text-muted)' }}>Catalog</Link>
          <ChevronRight size={14} />
          <Link href={`/catalog?category=${product.category}`} style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--accent-gold-light)', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '5rem'
          }}
        >
          {/* Left Column: Image Gallery */}
          <div>
            {/* Primary Large Image */}
            <div 
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--accent-border)',
                aspectRatio: '4/3',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span 
                className="chip chip-gold" 
                style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}
              >
                {product.category.toUpperCase()}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--accent-border)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeImageIndex === idx ? 1 : 0.65,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & CTAs */}
          <div>
            {/* Brand & Collection */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                {product.brand}
              </span>
              <button
                onClick={handleShare}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {copied ? <Check size={14} color="var(--success)" /> : <Share2 size={14} />}
                {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>

            {/* Product Title */}
            <h1 
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}
            >
              {product.name}
            </h1>

            {/* Quick Spec Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <span className="chip" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                Size: <strong style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>{product.size}</strong>
              </span>
              <span className="chip" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                Finish: <strong style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>{product.surfaceFinish}</strong>
              </span>
              <span className="chip" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                Thickness: <strong style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>{product.thicknessMm} mm</strong>
              </span>
            </div>

            {/* Price Range Notice Card */}
            <div 
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(200, 157, 104, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                Approximate Showroom Price Range
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-gold-light)', marginBottom: '0.5rem' }}>
                {product.priceRange}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                *Indicative price range. Final project pricing is determined based on quantity, project specifications, and logistical delivery requirements.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <a
                href={generateWhatsAppProductLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.9rem', fontSize: '1rem', width: '100%' }}
              >
                <MessageSquare size={19} /> Ask via WhatsApp (Pre-filled Inquiry)
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  onClick={() => addItem(product, 15)}
                  className="btn btn-secondary"
                  style={{ padding: '0.8rem' }}
                >
                  <ShoppingBag size={17} /> Add to Project Inquiry
                </button>
                <Link
                  href={`/calculator?productId=${product.id}&size=${product.size}&coverage=${product.coveragePerBoxM2}&pcs=${product.pcsPerBox}&type=${product.category === 'spc' ? 'spc' : product.category === 'wall-panel' ? 'wall-panel' : 'floor-wall'}`}
                  className="btn btn-outline"
                  style={{ padding: '0.8rem' }}
                >
                  <Calculator size={17} color="var(--accent-gold)" /> Calculate Tile Boxes
                </Link>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Architectural Description
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                {product.description}
              </p>
            </div>

            {/* Detailed Spec Sheet Table */}
            <div 
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '0.85rem 1.25rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--accent-border)', fontWeight: 600, fontSize: '0.9rem' }}>
                Technical & Packaging Specifications
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)', width: '45%' }}>Coverage per Box</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>{product.coveragePerBoxM2} m² / box</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>Pieces per Box</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>{product.pcsPerBox} pcs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>Dimensions</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)' }}>{product.size} cm</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>Thickness</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)' }}>{product.thicknessMm} mm</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>Surface Texture</td>
                    <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)' }}>{product.surfaceFinish}</td>
                  </tr>
                  {/* Dynamic specs */}
                  {Object.entries(product.specifications || {}).map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--accent-border)' }}>
                      <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>{key}</td>
                      <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-primary)' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ paddingTop: '3rem', borderTop: '1px solid var(--accent-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <span className="section-tag">Complementary Surfaces</span>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Similar In This Category</h2>
              </div>
              <Link href={`/catalog?category=${product.category}`} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                View More {product.category.toUpperCase()} →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="glass-panel glass-panel-hover" style={{ overflow: 'hidden' }}>
                  <Link href={`/catalog/${rel.slug}`} style={{ height: '180px', display: 'block', overflow: 'hidden' }}>
                    <img src={rel.images[0]} alt={rel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>
                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>{rel.brand} • {rel.size}</span>
                    <Link href={`/catalog/${rel.slug}`}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                        {rel.name}
                      </h4>
                    </Link>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold-light)', marginBottom: '0.75rem' }}>
                      {rel.priceRange}
                    </div>
                    <a
                      href={generateWhatsAppProductLink(rel)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
                    >
                      <MessageSquare size={13} /> Ask WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
