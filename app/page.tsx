'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/pages/Dashboard';
import Pipeline from '@/components/pages/Pipeline';
import Deals from '@/components/pages/Deals';
import NewDeal from '@/components/pages/NewDeal';
import Screening from '@/components/pages/Screening';
import Diligence from '@/components/pages/Diligence';
import IC from '@/components/pages/IC';
import Rejected from '@/components/pages/Rejected';
import Invested from '@/components/pages/Invested';
import Toast from '@/components/Toast';
import { useDealContext } from './contexts/DealContext';

type PageType =
  | 'dashboard'
  | 'pipeline'
  | 'deals'
  | 'new-deal'
  | 'screening'
  | 'diligence'
  | 'ic'
  | 'rejected'
  | 'invested';

const pages: Record<PageType, [string, string]> = {
  dashboard: ['Dashboard', 'Overview & pipeline health'],
  pipeline: ['Kanban Pipeline', 'Drag-free stage view'],
  deals: ['All Deals', 'Full deal register'],
  'new-deal': ['New Opportunity', 'Log inbound / outbound deal'],
  screening: ['Screening', '3-Step Screening (SOP §3.2)'],
  diligence: ['Due Diligence', 'DDR preparation (SOP §3.3)'],
  ic: ['Investment Committee', 'Final decision (SOP §3.4)'],
  rejected: ['Rejected Deals', 'All rejections tracked (SOP §4)'],
  invested: ['Invested Portfolio', 'Closed deals'],
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const { loading } = useDealContext();

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // Expose showToast globally for components
  useEffect(() => {
    (window as any).showToast = showToast;
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <Pipeline />;
      case 'deals':
        return <Deals />;
      case 'new-deal':
        return <NewDeal onSuccess={() => showToast('Deal created successfully!', 'success')} />;
      case 'screening':
        return <Screening />;
      case 'diligence':
        return <Diligence />;
      case 'ic':
        return <IC />;
      case 'rejected':
        return <Rejected />;
      case 'invested':
        return <Invested />;
      default:
        return <Dashboard />;
    }
  };

  const pageInfo = pages[currentPage] || pages.dashboard;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 ml-56 flex flex-col">
        <Topbar title={pageInfo[0]} subtitle={pageInfo[1]} onAddDeal={() => setCurrentPage('new-deal')} />
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}
