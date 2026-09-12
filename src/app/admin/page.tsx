'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Inbox, 
  UploadCloud, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Database,
  ArrowRight,
  Plus
} from 'lucide-react';
import { fetchProducts, getLocalInquiries } from '../../lib/store';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Product, Inquiry } from '../../lib/types';

export default function AdminOverviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    setInquiries(getLocalInquiries());

    const handleProductUpdate = () => fetchProducts().then(setProducts);
    const handleInquiryUpdate = () => setInquiries(getLocalInquiries());

    window.addEventListener('formatiles_products_updated', handleProductUpdate);
    window.addEventListener('formatiles_inquiries_updated', handleInquiryUpdate);

    return () => {
      window.removeEventListener('formatiles_products_updated', handleProductUpdate);
      window.removeEventListener('formatiles_inquiries_updated', handleInquiryUpdate);
    };
  }, []);

  const totalProducts = products.length;
  const featuredCount = products.filter(p => p.isFeatured).length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div>
      {/* Top Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1rem' }}>
        <div>
          <span className="section-tag">Internal Overview</span>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
            Showroom Operations Dashboard
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/products?action=new" className="btn btn-primary">
            <Plus size={16} /> Add New Surface
          </Link>
          <Link href="/admin/import" className="btn btn-secondary">
            <UploadCloud size={16} /> Bulk Import CSV
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        {/* Card 1: Total Products */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Catalog</span>
            <Package size={20} color="var(--accent-gold)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
            {totalProducts}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', marginTop: '0.5rem' }}>
            {featuredCount} surfaces featured on homepage
          </div>
        </div>

        {/* Card 2: Inquiries */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inquiries / Leads</span>
            <Inbox size={20} color="var(--whatsapp-green)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
            {inquiries.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: newInquiriesCount > 0 ? 'var(--warning)' : 'var(--text-muted)', marginTop: '0.5rem' }}>
            {newInquiriesCount} new leads pending quote
          </div>
        </div>

        {/* Card 3: Storage Engine */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Data Engine</span>
            <Database size={20} color="#2ec4b6" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginTop: '0.4rem' }}>
            {isSupabaseConfigured ? 'Supabase Cloud (Live)' : 'Local Hybrid Store'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.65rem' }}>
            {isSupabaseConfigured ? 'Connected to PostgreSQL' : 'Ready for .env Supabase setup'}
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              Recent Customer Quotation Requests
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Logged when customers submit project quote requests
            </p>
          </div>
          <Link href="/admin/inquiries" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
            View All ({inquiries.length}) <ArrowRight size={14} />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No customer inquiries logged yet. Inquiries submitted via the catalog or calculator drawer will appear here.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--accent-border)', textAlign: 'left', color: 'var(--accent-gold)' }}>
                  <th style={{ padding: '0.75rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem' }}>Phone (WhatsApp)</th>
                  <th style={{ padding: '0.75rem' }}>Items</th>
                  <th style={{ padding: '0.75rem' }}>Estimated Area</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {inq.customerName}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                      {inq.customerPhone}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                      {inq.items?.length || 1} material(s)
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                      ~{inq.totalAreaM2 || 0} m²
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span 
                        className="chip" 
                        style={{
                          background: inq.status === 'new' ? 'rgba(252, 163, 17, 0.15)' : 'rgba(46, 196, 182, 0.15)',
                          color: inq.status === 'new' ? 'var(--warning)' : 'var(--success)'
                        }}
                      >
                        {inq.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
