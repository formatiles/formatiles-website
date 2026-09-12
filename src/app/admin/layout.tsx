'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Package, 
  UploadCloud, 
  Inbox, 
  LayoutDashboard, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { checkAdminSession, logoutAdmin } from '../../lib/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // If on login page, don't guard
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const authed = checkAdminSession();
    setIsAuthenticated(authed);
    if (!authed) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div style={{ padding: '8rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Verifying administrator session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'CSV Bulk Import', href: '/admin/import', icon: UploadCloud },
    { label: 'Inquiries & Leads', href: '/admin/inquiries', icon: Inbox },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
      {/* Admin Top Navigation */}
      <div 
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--accent-border)',
          padding: '0.75rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="chip chip-gold" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Admin Portal
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              FormaTiles Internal Management
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              href="/catalog" 
              target="_blank" 
              style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              View Live Website <ExternalLink size={13} />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                fontSize: '0.85rem',
                color: 'var(--danger)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subnav Tabs */}
      <div 
        style={{
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--accent-border)',
          padding: '0.5rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(200, 157, 104, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(200, 157, 104, 0.25)' : '1px solid transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {children}
      </div>
    </div>
  );
}
