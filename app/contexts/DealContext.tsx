'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockDeals } from '@/lib/mockData';

export interface Deal {
  id: string;
  dealId: string;
  company: string;
  founder: string;
  sector: string;
  cstage: string;
  geo: string;
  ask: string;
  source: string;
  owner: string;
  url?: string;
  summary: string;
  notes?: string;
  status: string;
  align?: string;
  aiFit?: string;
  aiRisks?: string;
  aiDate?: string;
  callInsights?: string;
  callFlags?: string;
  callConviction?: string;
  callDate?: string;
  pinGo?: string;
  pinNotes?: string;
  pinDate?: string;
  ddrMarket?: string;
  ddrBiz?: string;
  ddrTraction?: string;
  ddrFounder?: string;
  ddrRisks?: string;
  ddrDate?: string;
  icMemo?: string;
  icDecision?: string;
  icDate?: string;
  rejectedReason?: string;
  rejectedNotes?: string;
  rejectedAt?: string;
  added: string;
}

interface DealContextType {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  getDeal: (id: string) => Deal | undefined;
  loading: boolean;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch deals from API with fallback to mock data
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/api/deals');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setDeals(data && data.length > 0 ? data : mockDeals);
      } catch (error) {
        console.warn('Failed to fetch deals from API, using mock data:', error);
        // Use mock data as fallback
        setDeals(mockDeals);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const addDeal = (deal: Deal) => {
    setDeals([...deals, deal]);
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(deals.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const getDeal = (id: string) => {
    return deals.find(d => d.id === id);
  };

  return (
    <DealContext.Provider value={{ deals, setDeals, addDeal, updateDeal, getDeal, loading }}>
      {children}
    </DealContext.Provider>
  );
};

export const useDealContext = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDealContext must be used within DealProvider');
  }
  return context;
};
