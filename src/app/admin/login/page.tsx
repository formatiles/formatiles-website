'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, Layers } from 'lucide-react';
import { loginAdmin } from '../../../lib/store';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pin)) {
      router.push('/admin');
    } else {
      setError('Invalid admin security key. Please check your credentials.');
    }
  };

  return (
    <div 
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #c89d68 0%, #876238 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b0d0e',
              margin: '0 auto 1rem'
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            FormaTiles Staff Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Enter your internal access key to manage products, pricing, and inquiries.
          </p>
        </div>

        {error && (
          <div 
            style={{
              background: 'rgba(230, 57, 70, 0.15)',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              color: '#ff858d',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Security Access Key
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                placeholder="Enter access key..."
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
                autoFocus
              />
            </div>
          </div>


          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
          >
            Authenticate & Enter Dashboard <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
