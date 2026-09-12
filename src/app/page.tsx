'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Calculator, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Maximize2,
  FileSpreadsheet
} from 'lucide-react';
import { CATEGORIES_DATA } from '../lib/data/initialProducts';
import { Product } from '../lib/types';
import { fetchProducts, generateWhatsAppProductLink, generateWhatsAppCalculationLink, calculateTileRequirements } from '../lib/store';
import { getWhatsAppNumber } from '../lib/constants';

import { useInquiry } from '../context/InquiryContext';
import { useLanguage } from '../context/LanguageContext';


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useInquiry();
  const { language, t } = useLanguage();
  const waNumber = getWhatsAppNumber();


  // Quick Calculator state for the homepage widget
  const [quickLength, setQuickLength] = useState<number>(5);
  const [quickWidth, setQuickWidth] = useState<number>(4);
  const [quickTileSize, setQuickTileSize] = useState<string>('60x60');
  const [quickWaste, setQuickWaste] = useState<number>(10);

  useEffect(() => {
    fetchProducts().then(setProducts);

    const handleUpdate = () => {
      fetchProducts().then(setProducts);
    };
    window.addEventListener('formatiles_products_updated', handleUpdate);
    return () => window.removeEventListener('formatiles_products_updated', handleUpdate);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  // Quick calculation logic
  const quickCoverage = quickTileSize === '60x120' ? 1.44 : quickTileSize === '80x80' ? 1.92 : 1.44;
  const quickPcs = quickTileSize === '60x120' ? 2 : quickTileSize === '80x80' ? 3 : 4;
  const quickCalcResult = calculateTileRequirements({
    calcType: 'floor-wall',
    lengthM: quickLength,
    widthM: quickWidth,
    useDirectArea: false,
    tileSizePreset: quickTileSize,
    coveragePerBoxM2: quickCoverage,
    pcsPerBox: quickPcs,
    wastePercent: quickWaste,
    approxPricePerM2: 220000
  });

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section 
        style={{
          position: 'relative',
          padding: '6rem 0 7rem',
          overflow: 'hidden',
          borderBottom: '1px solid var(--accent-border)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            {/* Tagline Badge */}
            <div 
              className="chip chip-gold" 
              style={{ marginBottom: '1.5rem', padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
            >
              <Sparkles size={14} /> {t('heroBadge')}
            </div>

            {/* Main Headline */}
            <h1 
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
              }}
            >
              {t('heroTitle1')} <span style={{ color: 'var(--accent-gold)' }}>{t('heroTitleHighlight')}</span> {t('heroTitle2')}
            </h1>

            {/* Sub-headline */}
            <p 
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '680px'
              }}
            >
              {t('heroDesc')}
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link href="/catalog" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
                {t('heroCtaCatalog')} <ArrowRight size={18} />
              </Link>
              <Link href="/calculator" className="btn btn-secondary" style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}>
                <Calculator size={18} color="var(--accent-gold)" /> {t('heroCtaCalc')}
              </Link>
              <a 
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi FormaTiles, I am planning a project and would like to consult with your surface specialists.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
              >
                <MessageSquare size={18} /> {t('btnWhatsApp')}
              </a>
            </div>

            {/* Trust Highlights */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--accent-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-gold)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {t('heroFeature1')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-gold)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {t('heroFeature2')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-gold)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {t('heroFeature3')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="section-tag">{t('catSectionTag')}</span>
              <h2 className="section-title">{t('catSectionTitle')}</h2>
              <p className="section-desc">
                {t('catSectionDesc')}
              </p>
            </div>
            <Link href="/catalog" className="btn btn-outline" style={{ marginBottom: '2.5rem' }}>
              {t('btnViewAllMaterials')} <ArrowRight size={16} />
            </Link>
          </div>


          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className="glass-panel glass-panel-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  textDecoration: 'none'
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 17, 19, 0.95) 0%, transparent 60%)'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1.25rem',
                      right: '1.25rem'
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        display: 'block'
                      }}
                    >
                      {cat.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)' }}>
                      {cat.tagline}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {cat.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {cat.commonSizes.map((sz) => (
                      <span key={sz} className="chip" style={{ fontSize: '0.7rem' }}>
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--accent-border)', borderBottom: '1px solid var(--accent-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="section-tag">Showroom Highlights</span>
              <h2 className="section-title">Featured Surfaces</h2>
              <p className="section-desc">
                High-demand large-format granites, Italian terrazzo ceramic, and acoustic wall claddings.
              </p>
            </div>
            <Link href="/catalog" className="btn btn-outline" style={{ marginBottom: '2.5rem' }}>
              Explore Full Catalog ({products.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {featuredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="glass-panel glass-panel-hover"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Product Image */}
                <Link href={`/catalog/${prod.slug}`} style={{ position: 'relative', height: '240px', overflow: 'hidden', display: 'block' }}>
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span 
                    className="chip chip-gold" 
                    style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                  >
                    {prod.category.toUpperCase()}
                  </span>
                  <span 
                    className="chip" 
                    style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)' }}
                  >
                    {prod.size}
                  </span>
                </Link>

                {/* Details */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    {prod.brand} • {prod.surfaceFinish}
                  </div>
                  <Link href={`/catalog/${prod.slug}`}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {prod.name}
                    </h3>
                  </Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {prod.description}
                  </p>

                  {/* Price Range Notice */}
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--accent-border)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
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
                        style={{ fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                      <button
                        onClick={() => addItem(prod, 10)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
                      >
                        + Add Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE QUICK TILE CALCULATOR WIDGET */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div 
            className="glass-panel"
            style={{
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid rgba(200, 157, 104, 0.3)',
              background: 'linear-gradient(135deg, rgba(23, 26, 29, 0.95) 0%, rgba(14, 17, 19, 0.98) 100%)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              {/* Left Column: Explainer */}
              <div>
                <span className="section-tag">
                  <Calculator size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {t('quickCalcTag')}
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  {t('quickCalcTitle')}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {t('quickCalcDesc')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" />
                    <span>{t('quickCalcPoint1')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" />
                    <span>{t('quickCalcPoint2')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" />
                    <span>{t('quickCalcPoint3')}</span>
                  </div>
                </div>
                <Link href="/calculator" className="btn btn-outline">
                  {t('quickCalcLaunchFull')} <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right Column: Live Interactive Calculator Card */}
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: 'var(--accent-gold-light)' }}>
                  {t('quickCalcCardTitle')}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      {t('quickCalcLength')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={quickLength}
                      onChange={(e) => setQuickLength(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      {t('quickCalcWidth')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={quickWidth}
                      onChange={(e) => setQuickWidth(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      {t('quickCalcTileSize')}
                    </label>
                    <select
                      value={quickTileSize}
                      onChange={(e) => setQuickTileSize(e.target.value)}
                      className="select-field"
                    >
                      <option value="60x60">60x60 cm (1.44 m²/box)</option>
                      <option value="60x120">60x120 cm (1.44 m²/box)</option>
                      <option value="80x80">80x80 cm (1.92 m²/box)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      {t('quickCalcWaste')}
                    </label>
                    <select
                      value={quickWaste}
                      onChange={(e) => setQuickWaste(Number(e.target.value))}
                      className="select-field"
                    >
                      <option value={5}>5% ({language === 'id' ? 'Ruang Standar' : 'Standard Room'})</option>
                      <option value={10}>10% ({language === 'id' ? 'Direkomendasikan' : 'Recommended'})</option>
                      <option value={15}>15% ({language === 'id' ? 'Potongan Diagonal' : 'Diagonal / Cuts'})</option>
                    </select>
                  </div>
                </div>

                {/* Live Output Box */}
                <div 
                  style={{
                    background: 'rgba(200, 157, 104, 0.08)',
                    border: '1px solid rgba(200, 157, 104, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('quickCalcTotalArea')}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {quickCalcResult.totalAreaM2} <span style={{ fontSize: '0.85rem' }}>m²</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Net {quickCalcResult.netAreaM2} m² + {quickWaste}%</div>
                    </div>
                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('quickCalcBoxesToOrder')}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold-light)' }}>
                        {quickCalcResult.boxesNeeded} <span style={{ fontSize: '0.85rem' }}>{language === 'id' ? 'dus' : 'boxes'}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>~{quickCalcResult.totalPieces} {language === 'id' ? 'keping' : 'tiles'}</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action with Pre-filled calculation */}
                <a
                  href={generateWhatsAppCalculationLink(quickCalcResult, `${quickTileSize} Floor Tiles`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <MessageSquare size={17} /> {t('quickCalcBtnSend')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOWROOM & WHATSAPP CONSULTATION BANNER */}
      <section style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
          <div 
            style={{
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, #1b2025 0%, #121517 100%)',
              border: '1px solid var(--accent-border)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <span className="section-tag">{t('bannerTag')}</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {t('bannerTitle')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                {t('bannerDesc')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi FormaTiles! I have a project specification and would like to request project pricing and physical samples.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
              >
                <MessageSquare size={20} /> {t('bannerBtnWa')}
              </a>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                {language === 'id' ? 'Respon cepat selama jam kerja operasional galeri' : 'Instant response during showroom business hours'}
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
