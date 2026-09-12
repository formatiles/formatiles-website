'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { bulkImportProducts } from '../../../lib/store';
import { Product } from '../../../lib/types';
import Link from 'next/link';

export default function BulkImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importSuccess, setImportSuccess] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setImportSuccess(null);
    setValidationErrors([]);

    Papa.parse(selected, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const errors: string[] = [];

        // Validate rows
        rows.forEach((row, i) => {
          if (!row.name || !row.name.trim()) {
            errors.push(`Row ${i + 1}: Missing product name.`);
          }
          if (row.coveragePerBoxM2 && isNaN(Number(row.coveragePerBoxM2))) {
            errors.push(`Row ${i + 1} (${row.name || 'Unnamed'}): Invalid coveragePerBoxM2.`);
          }
        });

        setValidationErrors(errors);
        setParsedData(rows);
      },
      error: (err) => {
        setValidationErrors([`File parse error: ${err.message}`]);
      }
    });
  };

  const handleCommitImport = async () => {
    if (parsedData.length === 0) return;
    setIsImporting(true);

    try {
      const result = await bulkImportProducts(parsedData);
      setImportSuccess(result.imported);
      if (result.errors.length > 0) {
        setValidationErrors(result.errors);
      }
      setParsedData([]);
      setFile(null);
    } catch (e: any) {
      setValidationErrors([`Import failed: ${e.message}`]);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-tag">Catalog Ingestion</span>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
          CSV / Excel Bulk Product Import
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '680px' }}>
          Quickly populate or migrate hundreds of ceramic, granite, SPC, and wall panel surfaces at once using structured spreadsheet data.
        </p>
      </div>

      {/* Instructions & Template Download Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSpreadsheet size={18} color="var(--accent-gold)" /> Download Sample Spreadsheet Template
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Includes required headers: <code>name, category, brand, size, surfaceFinish, coveragePerBoxM2, priceRange, imageUrls</code>.
          </p>
        </div>
        <a
          href="/data/formatiles_sample_import.csv"
          download="formatiles_sample_import.csv"
          className="btn btn-outline"
          style={{ fontSize: '0.85rem' }}
        >
          <Download size={15} /> Download CSV Template
        </a>
      </div>

      {/* File Upload Zone */}
      <div 
        className="glass-panel"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          border: '2px dashed var(--accent-border)',
          marginBottom: '2rem'
        }}
      >
        <UploadCloud size={44} color="var(--accent-gold)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Upload your CSV file
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Supported formats: .csv exported from Microsoft Excel, Apple Numbers, or Google Sheets
        </p>

        <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
          Select CSV File
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        {file && (
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--accent-gold-light)' }}>
            Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      {/* Success Banner */}
      {importSuccess !== null && (
        <div 
          style={{
            background: 'rgba(46, 196, 182, 0.15)',
            border: '1px solid var(--success)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#68edd9' }}>
            <CheckCircle2 size={20} />
            <span>Successfully imported <strong>{importSuccess}</strong> new surfaces into the catalog!</span>
          </div>
          <Link href="/admin/products" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
            View Products →
          </Link>
        </div>
      )}

      {/* Validation Warnings */}
      {validationErrors.length > 0 && (
        <div 
          style={{
            background: 'rgba(230, 57, 70, 0.12)',
            border: '1px solid var(--danger)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff707a', fontWeight: 600, marginBottom: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>Validation Notices ({validationErrors.length})</span>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#ffb3b8' }}>
            {validationErrors.slice(0, 5).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Live Preview Table */}
      {parsedData.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Import Preview ({parsedData.length} surfaces detected)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Verify parsed columns before writing to database
              </p>
            </div>
            <button
              onClick={handleCommitImport}
              disabled={isImporting}
              className="btn btn-primary"
            >
              {isImporting ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              Confirm & Ingest {parsedData.length} Products
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--accent-border)', textAlign: 'left', color: 'var(--accent-gold)' }}>
                  <th style={{ padding: '0.6rem 0.85rem' }}>#</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Name</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Category</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Brand</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Size</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Finish</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Coverage</th>
                  <th style={{ padding: '0.6rem 0.85rem' }}>Price Range</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 10).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--accent-border)' }}>
                    <td style={{ padding: '0.6rem 0.85rem', color: 'var(--text-muted)' }}>{idx + 1}</td>
                    <td style={{ padding: '0.6rem 0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</td>
                    <td style={{ padding: '0.6rem 0.85rem' }}>{row.category}</td>
                    <td style={{ padding: '0.6rem 0.85rem' }}>{row.brand}</td>
                    <td style={{ padding: '0.6rem 0.85rem' }}>{row.size}</td>
                    <td style={{ padding: '0.6rem 0.85rem' }}>{row.surfaceFinish}</td>
                    <td style={{ padding: '0.6rem 0.85rem' }}>{row.coveragePerBoxM2} m²</td>
                    <td style={{ padding: '0.6rem 0.85rem', color: 'var(--accent-gold-light)' }}>{row.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedData.length > 10 && (
              <div style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ...and {parsedData.length - 10} more rows ready for batch import
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
