'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InquiryItem, Product } from '../lib/types';

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (product: Product, areaM2?: number, boxes?: number) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalEstimatedArea: number;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('formatiles_inquiry_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (newItems: InquiryItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('formatiles_inquiry_cart', JSON.stringify(newItems));
    } catch (e) {}
  };

  const addItem = (product: Product, areaM2: number = 10, boxes?: number) => {
    const calculatedBoxes = boxes || Math.ceil(areaM2 / (product.coveragePerBoxM2 || 1.44));
    
    setItems(prev => {
      const existing = prev.findIndex(item => item.productId === product.id);
      let updated: InquiryItem[];
      if (existing >= 0) {
        updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          estimatedAreaM2: areaM2,
          calculatedBoxes
        };
      } else {
        updated = [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            category: product.category,
            size: product.size,
            estimatedAreaM2: areaM2,
            calculatedBoxes
          }
        ];
      }
      saveToStorage(updated);
      return updated;
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    const updated = items.filter(item => item.productId !== productId);
    saveToStorage(updated);
  };

  const clearItems = () => {
    saveToStorage([]);
  };

  const totalEstimatedArea = items.reduce((sum, item) => sum + (item.estimatedAreaM2 || 0), 0);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
        isOpen,
        setIsOpen,
        totalEstimatedArea
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
