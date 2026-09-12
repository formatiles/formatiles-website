'use client';

import React, { useState } from 'react';
import { X, Trash2, Send, MessageSquare, CheckCircle, Calculator, ArrowRight } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { saveInquiry, generateWhatsAppInquiryCartLink } from '../../lib/store';
import Link from 'next/link';

export default function InquiryDrawer() {
  const { items, isOpen, setIsOpen, removeItem, clearItems } = useInquiry();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalArea = items.reduce((sum, item) => sum + (Number(item.estimatedAreaM2) || 0), 0);
  const totalBoxes = items.reduce((sum, item) => sum + (Number(item.calculatedBoxes) || 0), 0);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please provide your name and WhatsApp number.');
      return;
    }

    // Save lead record internally for Admin tracking
    saveInquiry({
      customerName,
      customerPhone,
      projectLocation,
      items,
      totalAreaM2: totalArea,
      message: notes,
      status: 'new',
      source: 'catalog'
    });

    // Generate WhatsApp deep link
    const waLink = generateWhatsAppInquiryCartLink(items, customerName, projectLocation);

    setIsSubmitted(true);
    setTimeout(() => {
      window.open(waLink, '_blank');
      setIsSubmitted(false);
      clearItems();
      setIsOpen(false);
    }, 600);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        transition: 'opacity 0.2s ease'
      }}
    >
      {/* Click backdrop to close */}
      <div 
        style={{ flex: 1 }} 
        onClick={() => setIsOpen(false)} 
      />

      {/* Drawer Panel */}
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--accent-border)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--accent-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Project Quotation Drawer
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {items.length} {items.length === 1 ? 'material' : 'materials'} selected for quote
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: '0.5rem',
              color: 'var(--text-muted)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
            aria-label="Close Drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--accent-gold)'
                }}
              >
                <Calculator size={30} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Your project inquiry is empty
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Browse our architectural catalog and add surfaces or calculate floor boxes to request a consolidated quotation.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Explore Product Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Material List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-gold)' }}>
                    Selected Surfaces
                  </span>
                  <button
                    onClick={clearItems}
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                  >
                    <Trash2 size={13} /> Clear all
                  </button>
                </div>

                {items.map((item) => (
                  <div 
                    key={item.productId}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--accent-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {item.productName}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <span className="chip" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>{item.size}</span>
                        <span style={{ alignSelf: 'center' }}>•</span>
                        <span style={{ alignSelf: 'center' }}>~{item.estimatedAreaM2} m² ({item.calculatedBoxes} boxes)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        padding: '0.4rem',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Total Summary */}
                <div 
                  style={{
                    background: 'rgba(200, 157, 104, 0.08)',
                    border: '1px solid rgba(200, 157, 104, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Total Estimated Coverage:</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-gold-light)', fontSize: '1rem' }}>
                    {totalArea.toFixed(1)} m² (~{totalBoxes} boxes)
                  </span>
                </div>
              </div>

              {/* Customer Contact Form */}
              <form onSubmit={handleSubmitWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-gold)' }}>
                  Customer Details for Quote
                </span>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Hendra Wijaya"
                    className="input-field"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 081234567890"
                    className="input-field"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Project City / Location (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jakarta Selatan / Surabaya"
                    className="input-field"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Additional Notes / Project Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need delivery by next month, require physical sample."
                    className="input-field"
                    style={{ resize: 'vertical' }}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    type="submit"
                    className="btn btn-whatsapp"
                    style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={18} /> Preparing WhatsApp Quote...
                      </>
                    ) : (
                      <>
                        <MessageSquare size={18} /> Send Quote Request via WhatsApp
                      </>
                    )}
                  </button>
                  <span 
                    style={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      fontSize: '0.75rem', 
                      color: 'var(--text-muted)', 
                      marginTop: '0.5rem' 
                    }}
                  >
                    Direct connection to FormaTiles sales specialist. Zero automated spam.
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
