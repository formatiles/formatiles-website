'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calculator, 
  Layers, 
  MessageSquare, 
  Info, 
  Plus, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Grid
} from 'lucide-react';
import { calculateTileRequirements, generateWhatsAppCalculationLink, getWhatsAppNumber, fetchProducts } from '../../lib/store';
import { CalculationInput, CalculationOutput, Product } from '../../lib/types';
import { useInquiry } from '../../context/InquiryContext';

function CalculatorContent() {
  const searchParams = useSearchParams();
  const { addItem } = useInquiry();
  const waNumber = getWhatsAppNumber();

  // Tab mode: 'floor-wall' | 'spc' | 'wall-panel'
  const initialType = (searchParams.get('type') as any) || 'floor-wall';
  const [calcTab, setCalcTab] = useState<'floor-wall' | 'spc' | 'wall-panel'>(initialType);

  // Common input states
  const [lengthM, setLengthM] = useState<number>(6);
  const [widthM, setWidthM] = useState<number>(4.5);
  const [useDirectArea, setUseDirectArea] = useState<boolean>(false);
  const [directAreaM2, setDirectAreaM2] = useState<number>(27);
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [approxPricePerM2, setApproxPricePerM2] = useState<number>(230000);
  const [projectCity, setProjectCity] = useState<string>('');

  // Tile specific
  const [selectedTilePreset, setSelectedTilePreset] = useState<string>(searchParams.get('size') || '60x60');
  const [coveragePerBox, setCoveragePerBox] = useState<number>(Number(searchParams.get('coverage')) || 1.44);
  const [pcsPerBox, setPcsPerBox] = useState<number>(Number(searchParams.get('pcs')) || 4);

  // SPC specific
  const [spcIncludeSkirting, setSpcIncludeSkirting] = useState<boolean>(true);
  const [spcIncludeUnderlay, setSpcIncludeUnderlay] = useState<boolean>(true);

  // Wall Panel specific
  const [wallHeightM, setWallHeightM] = useState<number>(2.8);
  const [wallWidthM, setWallWidthM] = useState<number>(4.0);
  const [panelWidthCm, setPanelWidthCm] = useState<number>(16);

  // Tile presets map with authentic Roman & Niro Granite packaging specifications
  const tilePresets = [
    { label: '60 x 120 cm (Niro Granite Slab)', size: '60x120', coverage: 1.44, pcs: 2 },
    { label: '80 x 80 cm (Niro Large Format)', size: '80x80', coverage: 1.92, pcs: 3 },
    { label: '60 x 60 cm (Niro Homogeneous Porcelain)', size: '60x60', coverage: 1.44, pcs: 4 },
    { label: '50 x 50 cm (Roman Gres Floor Tile)', size: '50x50', coverage: 1.00, pcs: 4 },
    { label: '40 x 40 cm (Roman Floor Tile)', size: '40x40', coverage: 0.96, pcs: 6 },
    { label: '30 x 30 cm (Roman Gres/Anti-Slip)', size: '30x30', coverage: 0.99, pcs: 11 },
    { label: '20 x 20 cm (Roman Pool & Floor Tile)', size: '20x20', coverage: 1.00, pcs: 25 },
    { label: '15 x 90 cm (Niro Wood Porcelain Plank)', size: '15x90', coverage: 1.08, pcs: 8 },
    { label: '30 x 60 cm (Niro Wall/Step Tile)', size: '30x60', coverage: 1.44, pcs: 8 },
  ];

  // Handle tile preset change
  const handlePresetChange = (presetSize: string) => {
    setSelectedTilePreset(presetSize);
    const found = tilePresets.find(p => p.size === presetSize);
    if (found) {
      setCoveragePerBox(found.coverage);
      setPcsPerBox(found.pcs);
    }
  };

  // Run Calculations
  const tileInput: CalculationInput = {
    calcType: calcTab,
    lengthM,
    widthM,
    useDirectArea,
    directAreaM2,
    tileSizePreset: selectedTilePreset,
    coveragePerBoxM2: coveragePerBox,
    pcsPerBox,
    wastePercent,
    approxPricePerM2
  };

  const calcOutput = calculateTileRequirements(tileInput);

  // SPC Add-ons
  const roomPerimeterM = (lengthM + widthM) * 2;
  const skirtingPiecesNeeded = Math.ceil((roomPerimeterM * 1.05) / 2.4); // 2.4m standard skirting length
  const underlayRolls = Math.ceil(calcOutput.totalAreaM2 / 20); // 20m² per IXPE roll

  // Wall Panel Add-ons
  const wallAreaM2 = wallHeightM * wallWidthM;
  const panelsCount = Math.ceil((wallWidthM * 100) / panelWidthCm);
  const panelWastagePcs = Math.ceil(panelsCount * (wastePercent / 100));
  const totalPanels = panelsCount + panelWastagePcs;

  return (
    <div style={{ padding: '3rem 0 6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '2.5rem' }}>
          <span className="section-tag">Digital Estimation Suite</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
            Tile, Slab & SPC Calculator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Accurately plan your architectural surface procurement. Calculate net room dimensions, recommended wastage margins, exact factory box requirements, and send instant quote requests to FormaTiles via WhatsApp.
          </p>
        </div>

        {/* Tab Switcher */}
        <div 
          style={{
            display: 'flex',
            gap: '0.75rem',
            borderBottom: '1px solid var(--accent-border)',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => setCalcTab('floor-wall')}
            className={`btn ${calcTab === 'floor-wall' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.4rem' }}
          >
            <Grid size={16} /> Floor & Wall Tiles
          </button>
          <button
            onClick={() => setCalcTab('spc')}
            className={`btn ${calcTab === 'spc' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.4rem' }}
          >
            <Layers size={16} /> SPC Flooring & Skirting
          </button>
          <button
            onClick={() => setCalcTab('wall-panel')}
            className={`btn ${calcTab === 'wall-panel' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.4rem' }}
          >
            <Sparkles size={16} /> Acoustic Wall Panels
          </button>
        </div>

        {/* Main 2-Column Calculator Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* LEFT: Inputs Form */}
          <div 
            className="glass-panel"
            style={{ padding: '2rem' }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              1. Enter Room & Surface Specifications
            </h3>

            {/* Mode: Floor & Wall Tiles or SPC */}
            {calcTab !== 'wall-panel' ? (
              <>
                {/* Input method toggle */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setUseDirectArea(false)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: !useDirectArea ? 'rgba(200, 157, 104, 0.15)' : 'var(--bg-tertiary)',
                      border: !useDirectArea ? '1px solid var(--accent-gold)' : '1px solid var(--accent-border)',
                      color: !useDirectArea ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Dimensions (Length × Width)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseDirectArea(true)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: useDirectArea ? 'rgba(200, 157, 104, 0.15)' : 'var(--bg-tertiary)',
                      border: useDirectArea ? '1px solid var(--accent-gold)' : '1px solid var(--accent-border)',
                      color: useDirectArea ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Direct Area (Total m²)
                  </button>
                </div>

                {!useDirectArea ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                        Room Length (meters)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={lengthM}
                        onChange={(e) => setLengthM(Number(e.target.value))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                        Room Width (meters)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={widthM}
                        onChange={(e) => setWidthM(Number(e.target.value))}
                        className="input-field"
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                      Total Net Room Area (m²)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={directAreaM2}
                      onChange={(e) => setDirectAreaM2(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                )}

                {/* Tile / Plank Preset */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Surface / Tile Size Specification
                  </label>
                  <select
                    value={selectedTilePreset}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="select-field"
                  >
                    {tilePresets.map((preset) => (
                      <option key={preset.size} value={preset.size}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>Standard box coverage: {coveragePerBox} m²</span>
                    <span>Pieces per box: {pcsPerBox} pcs</span>
                  </div>
                </div>

                {/* Wastage */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Wastage & Cutting Allowance (%)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[
                      { val: 5, label: '5% (Simple)' },
                      { val: 10, label: '10% (Standard)' },
                      { val: 15, label: '15% (Diagonal/Patterns)' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setWastePercent(opt.val)}
                        style={{
                          padding: '0.55rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.8rem',
                          background: wastePercent === opt.val ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                          color: wastePercent === opt.val ? '#0b0d0e' : 'var(--text-secondary)',
                          border: wastePercent === opt.val ? 'none' : '1px solid var(--accent-border)',
                          fontWeight: wastePercent === opt.val ? 700 : 400,
                          cursor: 'pointer'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SPC Add-ons */}
                {calcTab === 'spc' && (
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold-light)', marginBottom: '0.75rem' }}>
                      SPC Accessories & Skirting
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={spcIncludeSkirting}
                        onChange={(e) => setSpcIncludeSkirting(e.target.checked)}
                      />
                      Calculate Wall Skirting / Plinth ({roomPerimeterM.toFixed(1)}m perimeter)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={spcIncludeUnderlay}
                        onChange={(e) => setSpcIncludeUnderlay(e.target.checked)}
                      />
                      Calculate Acoustic Underlayment Foam Rollers
                    </label>
                  </div>
                )}
              </>
            ) : (
              /* Wall Panel Form */
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                      Wall Height (meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={wallHeightM}
                      onChange={(e) => setWallHeightM(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                      Wall Width (meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      value={wallWidthM}
                      onChange={(e) => setWallWidthM(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Wall Panel Slat Width
                  </label>
                  <select
                    value={panelWidthCm}
                    onChange={(e) => setPanelWidthCm(Number(e.target.value))}
                    className="select-field"
                  >
                    <option value={16}>16 cm Fluted Acoustic Slat Panel (290cm length)</option>
                    <option value={20}>20 cm WPC Linear Cladding Panel (290cm length)</option>
                    <option value={12}>12 cm Compact 3D Wall Panel (280cm length)</option>
                  </select>
                </div>
              </>
            )}

            {/* Optional Project City */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Project Location / City (For delivery rate check)
              </label>
              <input
                type="text"
                placeholder="e.g. Jakarta Barat, BSD, Surabaya, Bali"
                value={projectCity}
                onChange={(e) => setProjectCity(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* RIGHT: Results Breakdown & WhatsApp Action */}
          <div 
            className="glass-panel"
            style={{
              padding: '2rem',
              border: '1px solid rgba(200, 157, 104, 0.4)',
              background: 'linear-gradient(135deg, rgba(23, 26, 29, 0.95) 0%, rgba(14, 17, 19, 0.98) 100%)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ margin: 0 }}>Calculation Result</span>
              <span className="chip chip-gold">Estimates Only</span>
            </div>

            {/* Highlighted Box Requirement Display */}
            <div 
              style={{
                background: 'rgba(200, 157, 104, 0.1)',
                border: '1px solid rgba(200, 157, 104, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '2rem'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                Recommended Order Quantity
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {calcTab === 'wall-panel' ? totalPanels : calcOutput.boxesNeeded}
                <span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--accent-gold)', marginLeft: '6px' }}>
                  {calcTab === 'wall-panel' ? 'panels' : 'boxes'}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {calcTab === 'wall-panel' ? (
                  <span>Covers {wallAreaM2.toFixed(2)} m² wall area (includes {panelWastagePcs} spare panel)</span>
                ) : (
                  <span>Covers <strong>{calcOutput.actualCoverageM2} m²</strong> (Exact tiles: ~{calcOutput.totalPieces} pcs)</span>
                )}
              </div>
            </div>

            {/* Detailed Metrics Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Net Room / Wall Area:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {calcTab === 'wall-panel' ? wallAreaM2.toFixed(2) : calcOutput.netAreaM2} m²
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wastage Allowance ({wastePercent}%):</span>
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>
                  +{calcTab === 'wall-panel' ? (wallAreaM2 * (wastePercent/100)).toFixed(2) : calcOutput.wasteAreaM2} m²
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Calculated Area:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {calcTab === 'wall-panel' ? (wallAreaM2 * (1 + wastePercent/100)).toFixed(2) : calcOutput.totalAreaM2} m²
                </span>
              </div>

              {calcTab === 'spc' && spcIncludeSkirting && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Wall Skirting (2.4m/pc):</span>
                  <span style={{ color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                    ~{skirtingPiecesNeeded} pcs ({roomPerimeterM.toFixed(1)}m perimeter)
                  </span>
                </div>
              )}

              {calcTab === 'spc' && spcIncludeUnderlay && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Acoustic Underlay Foam (20m²/roll):</span>
                  <span style={{ color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                    ~{underlayRolls} roll{underlayRolls > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--accent-border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Material Budget:</span>
                <span style={{ color: 'var(--accent-gold-light)', fontWeight: 700 }}>
                  Rp {(calcOutput.estimatedBudgetMin).toLocaleString('id-ID')} - {(calcOutput.estimatedBudgetMax).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                href={generateWhatsAppCalculationLink(
                  calcOutput, 
                  calcTab === 'wall-panel' 
                    ? `Acoustic Wall Panels (${wallWidthM}x${wallHeightM}m)`
                    : `${selectedTilePreset} ${calcTab.toUpperCase()}`,
                  projectCity
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.9rem', fontSize: '1rem', width: '100%' }}
              >
                <MessageSquare size={18} /> Send Calculation to WhatsApp
              </a>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                Pre-formats the exact room dimensions and box requirements into your WhatsApp message.
              </p>
            </div>

            {/* Disclaimer Callout */}
            <div 
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <Info size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Calculations are estimates only. Grout width, tile tonality batches, and cutting complexity should be reviewed with FormaTiles before ordering.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>Loading calculator...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
