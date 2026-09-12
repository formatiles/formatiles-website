'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star, 
  Check, 
  X, 
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { fetchProducts, saveProduct, deleteProduct } from '../../../lib/store';
import { Product, ProductCategory } from '../../../lib/types';
import Link from 'next/link';

function ProductsManagementContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: 'granite' as ProductCategory,
    brand: 'Forma Luxe',
    size: '60x120',
    surfaceFinish: 'Polished',
    thicknessMm: 9.5,
    pcsPerBox: 2,
    coveragePerBoxM2: 1.44,
    priceRange: 'Rp 240.000 - 300.000 / m²',
    startingPriceNumeric: 240000,
    isFeatured: false,
    imageUrl: '',
    description: ''
  });

  const loadData = () => {
    fetchProducts().then(setProducts);
  };

  useEffect(() => {
    loadData();
    if (searchParams.get('action') === 'new') {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'granite',
      brand: 'Forma Luxe',
      size: '60x120',
      surfaceFinish: 'Polished Mirror Gloss',
      thicknessMm: 9.5,
      pcsPerBox: 2,
      coveragePerBoxM2: 1.44,
      priceRange: 'Rp 240.000 - 310.000 / m²',
      startingPriceNumeric: 240000,
      isFeatured: false,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      size: p.size,
      surfaceFinish: p.surfaceFinish,
      thicknessMm: p.thicknessMm,
      pcsPerBox: p.pcsPerBox,
      coveragePerBoxM2: p.coveragePerBoxM2,
      priceRange: p.priceRange,
      startingPriceNumeric: p.startingPriceNumeric,
      isFeatured: p.isFeatured,
      imageUrl: p.images[0] || '',
      description: p.description
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProduct({
      id: editingProduct ? editingProduct.id : undefined,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      size: formData.size,
      surfaceFinish: formData.surfaceFinish,
      thicknessMm: Number(formData.thicknessMm),
      pcsPerBox: Number(formData.pcsPerBox),
      coveragePerBoxM2: Number(formData.coveragePerBoxM2),
      priceRange: formData.priceRange,
      startingPriceNumeric: Number(formData.startingPriceNumeric),
      isFeatured: formData.isFeatured,
      images: [formData.imageUrl],
      description: formData.description
    });

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
      loadData();
    }
  };

  const handleToggleFeatured = async (p: Product) => {
    await saveProduct({
      ...p,
      isFeatured: !p.isFeatured
    });
    loadData();
  };

  const filtered = products.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.size.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
            Product Catalog Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Add, update specifications, adjust approximate price ranges, or feature surfaces.
          </p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={16} /> Add New Surface
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {['all', 'granite', 'ceramic', 'spc', 'wall-panel'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="chip"
              style={{
                background: selectedCategory === cat ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                color: selectedCategory === cat ? '#0b0d0e' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                padding: '0.4rem 0.85rem'
              }}
            >
              {cat === 'all' ? 'All Products' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem', padding: '0.5rem 0.75rem 0.5rem 2.5rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div 
        className="glass-panel"
        style={{ overflow: 'hidden' }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--accent-border)', textAlign: 'left', color: 'var(--accent-gold)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Surface</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem' }}>Brand & Size</th>
                <th style={{ padding: '0.85rem 1rem' }}>Coverage/Box</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price Range</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Featured</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid var(--accent-border)' }}>
                  {/* Photo & Name */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prod.surfaceFinish}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="chip" style={{ fontSize: '0.7rem' }}>
                      {prod.category.toUpperCase()}
                    </span>
                  </td>

                  {/* Brand & Size */}
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                    <div>{prod.brand}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{prod.size}</div>
                  </td>

                  {/* Coverage */}
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                    {prod.coveragePerBoxM2} m² ({prod.pcsPerBox} pcs)
                  </td>

                  {/* Price */}
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                    {prod.priceRange}
                  </td>

                  {/* Featured Toggle */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleFeatured(prod)}
                      style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                      title={prod.isFeatured ? 'Unfeature from Homepage' : 'Feature on Homepage'}
                    >
                      <Star 
                        size={18} 
                        color={prod.isFeatured ? 'var(--warning)' : 'var(--text-muted)'} 
                        fill={prod.isFeatured ? 'var(--warning)' : 'none'} 
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <Link
                        href={`/catalog/${prod.slug}`}
                        target="_blank"
                        style={{ padding: '0.4rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="View on site"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button
                        onClick={() => openEditModal(prod)}
                        style={{ padding: '0.4rem', color: 'var(--accent-gold)', cursor: 'pointer' }}
                        title="Edit surface"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        style={{ padding: '0.4rem', color: 'var(--danger)', cursor: 'pointer' }}
                        title="Delete surface"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                {editingProduct ? 'Edit Architectural Surface' : 'Add New Architectural Surface'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Surface Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calacatta Gold Glazed Porcelain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="select-field"
                  >
                    <option value="granite">Granite & Slabs</option>
                    <option value="ceramic">Ceramic & Porcelain</option>
                    <option value="spc">SPC Flooring</option>
                    <option value="wall-panel">Wall Panels & Slats</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Forma Luxe"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Size (e.g. 60x120) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="60x120"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Surface Finish *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Polished / Matte"
                    value={formData.surfaceFinish}
                    onChange={(e) => setFormData({ ...formData, surfaceFinish: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Thickness (mm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.thicknessMm}
                    onChange={(e) => setFormData({ ...formData, thicknessMm: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Box Coverage (m²) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.coveragePerBoxM2}
                    onChange={(e) => setFormData({ ...formData, coveragePerBoxM2: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Pieces per Box *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pcsPerBox}
                    onChange={(e) => setFormData({ ...formData, pcsPerBox: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Display Price Range *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rp 240.000 - 310.000 / m²"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                    Starting Price Numeric (for sorting)
                  </label>
                  <input
                    type="number"
                    value={formData.startingPriceNumeric}
                    onChange={(e) => setFormData({ ...formData, startingPriceNumeric: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Product Photo URL (Unsplash or Supabase Storage)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  Architectural Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe material texture, veining, aesthetic application..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                Feature this surface on Homepage
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Check size={16} /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsManagementPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem 0', textAlign: 'center' }}>Loading products...</div>}>
      <ProductsManagementContent />
    </Suspense>
  );
}
