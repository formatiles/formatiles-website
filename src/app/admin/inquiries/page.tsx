'use client';

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ExternalLink,
  Filter
} from 'lucide-react';
import { getLocalInquiries, updateInquiryStatus } from '../../../lib/store';
import { Inquiry } from '../../../lib/types';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadInquiries = () => {
    setInquiries(getLocalInquiries());
  };

  useEffect(() => {
    loadInquiries();
    window.addEventListener('formatiles_inquiries_updated', loadInquiries);
    return () => window.removeEventListener('formatiles_inquiries_updated', loadInquiries);
  }, []);

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    updateInquiryStatus(id, newStatus);
    loadInquiries();
  };

  const filtered = inquiries.filter(inq => {
    if (statusFilter !== 'all' && inq.status !== statusFilter) return false;
    return true;
  });

  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.substring(1);
    }
    return clean;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <span className="section-tag">Lead Management</span>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
            Customer Quotation & Inquiries Log
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Track client surface requests, review calculator projections, and follow up directly on WhatsApp.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'new', 'contacted', 'quoted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className="chip"
              style={{
                background: statusFilter === st ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                color: statusFilter === st ? '#0b0d0e' : 'var(--text-secondary)',
                fontWeight: statusFilter === st ? 700 : 500,
                cursor: 'pointer',
                padding: '0.4rem 0.85rem'
              }}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Cards List */}
      {filtered.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
          <Inbox size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>No inquiries found for this status filter</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Inquiries submitted by customers on the live showroom website will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map((inq) => {
            const cleanPhone = getCleanPhone(inq.customerPhone);
            const waFollowUpLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.customerName}, this is FormaTiles Sales Team regarding your surface inquiry from our website showroom. How can we assist with your project quotation?`)}`;

            return (
              <div 
                key={inq.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderLeft: inq.status === 'new' ? '4px solid var(--warning)' : '4px solid var(--accent-gold)'
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-gold)'
                      }}
                    >
                      <User size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {inq.customerName}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Phone size={12} /> {inq.customerPhone}
                        </span>
                        {inq.projectLocation && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} /> {inq.projectLocation}
                          </span>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} /> {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className="select-field"
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8rem',
                        width: 'auto',
                        background: inq.status === 'new' ? 'rgba(252, 163, 17, 0.2)' : 'var(--bg-tertiary)',
                        color: inq.status === 'new' ? 'var(--warning)' : 'var(--text-primary)',
                        fontWeight: 600
                      }}
                    >
                      <option value="new">Status: NEW</option>
                      <option value="contacted">Status: CONTACTED</option>
                      <option value="quoted">Status: QUOTED</option>
                      <option value="closed">Status: CLOSED</option>
                    </select>

                    <a
                      href={waFollowUpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
                    >
                      <MessageSquare size={15} /> WhatsApp Client
                    </a>
                  </div>
                </div>

                {/* Requested Materials */}
                {inq.items && inq.items.length > 0 && (
                  <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Requested Materials & Projected Quantities ({inq.items.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {inq.items.map((it, idx) => (
                        <div 
                          key={idx}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--accent-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.825rem'
                          }}
                        >
                          <strong style={{ color: 'var(--text-primary)' }}>{it.productName}</strong>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>({it.size})</span>
                          <span style={{ color: 'var(--accent-gold-light)', marginLeft: '6px' }}>~{it.estimatedAreaM2} m² ({it.calculatedBoxes} boxes)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customer Notes */}
                {inq.message && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{inq.message}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
