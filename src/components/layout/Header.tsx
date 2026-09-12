'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  MessageSquare, 
  ShoppingBag, 
  Menu, 
  X, 
  Layers, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import { getWhatsAppNumber } from '../../lib/constants';

export default function Header() {
  const pathname = usePathname();
  const { items, setIsOpen } = useInquiry();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waNumber = getWhatsAppNumber();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navShowroom'), href: '/' },
    { name: t('navCatalog'), href: '/catalog' },
    { name: t('navCalculator'), href: '/calculator' },
  ];



  const totalItemsCount = items.length;

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(11, 13, 14, 0.92)' : 'rgba(11, 13, 14, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link 
          href="/" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #c89d68 0%, #876238 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b0d0e',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(200, 157, 104, 0.3)'
            }}
          >
            <Layers size={20} />
          </div>
          <div>
            <span 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem', 
                fontWeight: 700, 
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                display: 'block',
                lineHeight: 1
              }}
            >
              FORMATILES
            </span>
            <span 
              style={{ 
                fontSize: '0.65rem', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: 'var(--accent-gold)',
                display: 'block',
                marginTop: '3px'
              }}
            >
              Architectural Surfaces
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {link.name}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-gold)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons (Right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Language Switcher (EN | ID) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--accent-border)', 
              borderRadius: 'var(--radius-full)', 
              padding: '2px',
              gap: '2px'
            }}
          >
            <button
              onClick={() => setLanguage('id')}
              style={{
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: language === 'id' ? 700 : 500,
                background: language === 'id' ? 'var(--accent-gold)' : 'transparent',
                color: language === 'id' ? '#0b0d0e' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: language === 'en' ? 700 : 500,
                background: language === 'en' ? 'var(--accent-gold)' : 'transparent',
                color: language === 'en' ? '#0b0d0e' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Inquiry Drawer Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-secondary"
            style={{ position: 'relative', padding: '0.6rem 0.9rem', borderRadius: 'var(--radius-md)' }}
            aria-label="View Project Inquiries"
            title="View Quote Inquiries"
          >
            <ShoppingBag size={18} />
            <span style={{ display: 'none' }} className="inquiry-btn-text">{t('btnInquiries')}</span>

            {totalItemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--accent-gold)',
                  color: '#0b0d0e',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(200, 157, 104, 0.4)'
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Quick WhatsApp Contact CTA */}
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi FormaTiles! I would like to inquire about your tiles and architectural surfaces.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}
          >
            <MessageSquare size={17} />
            <span className="wa-btn-text">{t('btnWhatsApp')}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: '0.5rem',
              color: 'var(--text-primary)',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-border)'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--accent-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Mobile Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--accent-border)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bahasa / Language:</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setLanguage('id')}
                className="chip"
                style={{
                  background: language === 'id' ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                  color: language === 'id' ? '#0b0d0e' : 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ID (Indonesia)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className="chip"
                style={{
                  background: language === 'en' ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                  color: language === 'en' ? '#0b0d0e' : 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                EN (English)
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                color: pathname === link.href ? 'var(--accent-gold)' : 'var(--text-primary)',
                fontWeight: pathname === link.href ? 600 : 400
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--accent-border)', display: 'flex', gap: '0.75rem' }}>
            <Link 
              href="/calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-outline"
              style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
            >
              <Calculator size={15} /> {t('navCalculator')}
            </Link>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsOpen(true); }}
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
            >
              <ShoppingBag size={15} /> {t('btnInquiries')} ({totalItemsCount})
            </button>
          </div>
        </div>
      )}


    </header>
  );
}

