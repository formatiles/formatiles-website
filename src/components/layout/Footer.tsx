'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, MessageSquare, MapPin, Phone, Mail, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { getWhatsAppNumber } from '../../lib/constants';


export default function Footer() {
  const waNumber = getWhatsAppNumber();

  return (
    <footer 
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--accent-border)',
        marginTop: '6rem',
        padding: '5rem 0 2.5rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #c89d68 0%, #876238 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0b0d0e'
                }}
              >
                <Layers size={18} />
              </div>
              <span 
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)'
                }}
              >
                FORMATILES
              </span>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Curating high-performance architectural surfaces: large-format granite slabs, designer porcelain ceramics, 3D acoustic fluted wall panels, and rigid-core SPC flooring.
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi FormaTiles! I would like to schedule a physical showroom visit or request material samples.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.1rem' }}
            >
              <MessageSquare size={16} /> Consult with Specialist
            </a>
          </div>

          {/* Product Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
              Product Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/catalog?category=granite" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Granite & Slabs <ArrowUpRight size={14} color="var(--accent-gold)" />
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=ceramic" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Ceramic & Porcelain <ArrowUpRight size={14} color="var(--accent-gold)" />
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=spc" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  SPC Rigid Flooring <ArrowUpRight size={14} color="var(--accent-gold)" />
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=wall-panel" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Wall Panels & Slats <ArrowUpRight size={14} color="var(--accent-gold)" />
                </Link>
              </li>
              <li>
                <Link href="/catalog" style={{ color: 'var(--accent-gold-light)', fontSize: '0.925rem', marginTop: '0.25rem', display: 'inline-block' }}>
                  View All Surfaces →
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
              Architectural Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/calculator" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  Tile Area & Box Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator?type=spc" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  SPC Flooring & Skirting Estimator
                </Link>
              </li>
              <li>
                <Link href="/calculator?type=wall-panel" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  Acoustic Wall Panel Estimator
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
                  <Shield size={13} /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Hours */}
          <div>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '1.25rem' }}>
              Showroom & Service
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Clock size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Monday - Saturday: 08:30 - 17:30 WIB<br />Sunday: By Appointment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Phone size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>+{waNumber.substring(0,2)} {waNumber.substring(2,5)}-{waNumber.substring(5,9)}-{waNumber.substring(9)} (WhatsApp Direct)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Architectural Material District, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div 
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--accent-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}
        >
          <strong style={{ color: 'var(--text-secondary)' }}>Disclaimer & Material Estimates:</strong> All product calculations, estimated box requirements, wastage percentages, and starting prices displayed on this website are intended as non-binding planning simulations. Tile tonality, caliber batches, and final project quotations must be verified with our FormaTiles project representatives prior to procurement.
        </div>

        {/* Copyright */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--accent-border)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} FormaTiles. All rights reserved. Architectural Surface Specialists.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/catalog" style={{ color: 'var(--text-muted)' }}>Catalog</Link>
            <Link href="/calculator" style={{ color: 'var(--text-muted)' }}>Calculator</Link>
            <Link href="/admin/login" style={{ color: 'var(--text-muted)' }}>Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
