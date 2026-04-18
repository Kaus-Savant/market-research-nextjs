'use client';

import { useDealContext } from '@/app/contexts/DealContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: any) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { deals } = useDealContext();

  const getCountByStatus = (status: string) => {
    return deals.filter(d => d.status === status).length;
  };

  const screeningCount = getCountByStatus('Screening');
  const ddCount = getCountByStatus('Due Diligence');
  const icCount = getCountByStatus('IC');

  const NavItem = ({ icon, label, page, badge }: any) => (
    <button
      onClick={() => onPageChange(page)}
      className={`w-full flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all border-l-4 ${
        currentPage === page
          ? 'bg-yellow-100 bg-opacity-20 text-yellow-600 border-yellow-500'
          : 'text-slate-300 border-transparent hover:bg-slate-800'
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge ? (
        <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      ) : null}
    </button>
  );

  return (
    <aside className="w-56 bg-slate-800 text-white fixed h-screen flex flex-col z-50">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">
          Silver<span className="text-yellow-600">X</span>
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Deal Flow Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        {/* Overview */}
        <div className="px-4 py-2 text-xs uppercase tracking-widest text-slate-500 font-bold">
          Overview
        </div>
        <NavItem icon="📊" label="Dashboard" page="dashboard" />

        {/* Pipeline */}
        <div className="px-4 py-2 text-xs uppercase tracking-widest text-slate-500 font-bold mt-4">
          Pipeline
        </div>
        <NavItem icon="🔀" label="Kanban Pipeline" page="pipeline" />
        <NavItem icon="📋" label="All Deals" page="deals" badge={deals.length} />

        {/* Stages */}
        <div className="px-4 py-2 text-xs uppercase tracking-widest text-slate-500 font-bold mt-4">
          Stages
        </div>
        <NavItem icon="➕" label="New Opportunity" page="new-deal" />
        <NavItem icon="🔍" label="Screening" page="screening" badge={screeningCount} />
        <NavItem icon="🔬" label="Due Diligence" page="diligence" badge={ddCount} />
        <NavItem icon="⚖️" label="Inv. Committee" page="ic" badge={icCount} />

        {/* Records */}
        <div className="px-4 py-2 text-xs uppercase tracking-widest text-slate-500 font-bold mt-4">
          Records
        </div>
        <NavItem icon="✗" label="Rejected Deals" page="rejected" />
        <NavItem icon="✅" label="Invested" page="invested" />
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-500">
        SOP v1.0 — Apr 2026
      </div>
    </aside>
  );
}
